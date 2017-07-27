import express from 'express';
import path from 'path';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducers from './app/reducers';
import App from './app';
import template from './app/template';
import api from './api';

const app = express();
const store = createStore(reducers);
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', api);

app.get('/', (req, res) => {
  const appString = renderToString(<Provider store={store}><App /></Provider>);
  const finalState = store.getState();
  setTimeout(() => {
    res.send(template({
      body: appString,
      title: 'FROM THE SERVER',
      preloadedState: finalState,
    }));
  }, 3000);
});

const port = 3001;
app.listen(port);
console.log(`Listening on port ${port}`);
