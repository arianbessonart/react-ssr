import express from 'express';
import path from 'path';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducers from './app/reducers';
import App from './app';
import template from './app/template';

const app = express();
const store = createStore(reducers);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  const appString = renderToString(<Provider store={store}><App /></Provider>);
  res.send(template({
    body: appString,
    title: 'FROM THE SERVER'
  }));
});

const port = 3001;
app.listen(port);
console.log(`Listening on port ${port}`);
