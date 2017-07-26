import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './app/index';
import reducers from './app/reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(reducers, preloadedState);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
