const rp = require('request-promise');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const appInitURL = '';
const appInitDataURL = '';

function init() {
  rp({
    uri: appInitURL,
    json: true,
  }).then((response) => {
    if (response) {
      const token = response.LoginSystemResult.APIToken;
      cache.set('token', token);
      rp({
        uri: appInitDataURL,
        headers: {
          Authorization: token,
        },
        json: true,
      }).then((responseInitData) => {
        if (responseInitData) {
          cache.set('initData', responseInitData);
        }
        return null;
      }).catch((err) => err);
    }
    return null;
  }).catch((err) => err);
}

function getToken() {
  return cache.get('token');
}

function getInitData() {
  return cache.get('initData');
}

const encodeData = (data) => Object.keys(data).map((key) => {
  if (data[key] !== '') {
    return [key, data[key]].map(encodeURIComponent).join('=');
  }
}).join('&');

module.exports = {
  init,
  getToken,
  getInitData,
  encodeData,
};
