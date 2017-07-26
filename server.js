import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './app/template';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(template({
    body: appString,
    title: 'FROM THE SERVER'
  }));
});

const port = 3001;
app.listen(port);
console.log(`Listening on port ${port}`);
