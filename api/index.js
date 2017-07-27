const express = require('express');
const router = express.Router();
require('./controllers').init();
const restaurants = require('./routes/restaurants.js');
// const products = require('./products.js');

router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    req.max = parseInt(req.query.max || 50);
    req.offset = parseInt(req.query.offset || 0);
    req.q = req.query.q || false;
    delete req.query.max;
    delete req.query.offset;
    delete req.query.q;
    next();
  }
});

router.use('/v1/restaurants', restaurants);
// router.use('/v1/products', products);

module.exports = router;
