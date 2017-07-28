import express from 'express';
import path from 'path';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import reducers from './app/reducers';
import routes from './app/routes.js';
import template from './app/template';
import api from './api';

const app = express();
const store = createStore(reducers, applyMiddleware(thunk));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', api);

app.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });

  return Promise.all(promises).then((data) => {
    let context = {};
    const appString = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }
    const finalState = store.getState();
    setTimeout(() => {
      res.send(template({
        body: appString,
        title: 'FROM THE SERVER',
        preloadedState: finalState,
      }));
    }, 0);
    // res.render('index', {title: 'Express', data: store.getState(), content });
  });



  // const appString = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.url} context={{}}>
  //       {renderRoutes(routes)}
  //     </StaticRouter>
  //   </Provider>
  // );
  // const finalState = store.getState();
  // setTimeout(() => {
  //   res.send(template({
  //     body: appString,
  //     title: 'FROM THE SERVER',
  //     preloadedState: finalState,
  //   }));
  // }, 1000);
});

const port = 3001;
app.listen(port);
console.log(`Listening on port ${port}`);
