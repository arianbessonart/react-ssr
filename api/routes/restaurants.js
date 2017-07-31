const rp = require('request-promise');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const controller = require('../controllers');
const channelService = require('../services/channels');
const restaurantsURL = '';
const restaurantURL = '';

function find(req, res) {
  if (!req.query.point) {
    return res.status(400).send({ ok: false });
  }
  const filters = controller.encodeData(req.query);
  const { max, offset } = req;
  const url = `${restaurantsURL}&country=1&max=${max}&offset=${offset}&withFilters=true&searchWithFeaturedProducts=true&${filters}`;
  const token = controller.getToken();
  rp({
    uri: url,
    headers: {
      Authorization: token,
    },
    json: true,
  }).then((response) => {
    const initialData = controller.getInitData();
    if (initialData && initialData.channels && response && response.filters && response.filters.channels) {
      const initialDataChannels = initialData.channels;
      response.filters.channels = response.filters.channels.map((c) => {
        const cInitData = initialDataChannels.find((i) => i.id === c.id);
        cInitData.total = c.total;
        return cInitData;
      });
      response.filters = channelService.addFakesChannels(response.filters, initialData.channels);
    }
    if (!response.featuredProducts) {
      response.featuredProducts = [
        {
          title: 'Gramajo Mimoso',
          price: 275,
          urlBackground: '1535295-background.jpg',
          restaurantUrl: '/restaurantes/montevideo/mimoso-menu',
          restaurantName: 'Mimoso Resto Bar',
          restaurantId: 1602,
          productId: 1535295,
        },
        {
          title: 'Gramajo Mimoso',
          price: 275,
          urlBackground: '1535295-background.jpg',
          restaurantUrl: '/restaurantes/montevideo/mimoso-menu',
          restaurantName: 'Mimoso Resto Bar',
          restaurantId: 1602,
          productId: 1535295,
        },
        {
          title: 'Gramajo Mimoso',
          price: 275,
          urlBackground: '1535295-background.jpg',
          restaurantUrl: '/restaurantes/montevideo/mimoso-menu',
          restaurantName: 'Mimoso Resto Bar',
          restaurantId: 1602,
          productId: 1535295,
        },
        {
          title: 'Gramajo Mimoso',
          price: 275,
          urlBackground: '1535295-background.jpg',
          restaurantUrl: '/restaurantes/montevideo/mimoso-menu',
          restaurantName: 'Mimoso Resto Bar',
          restaurantId: 1602,
          productId: 1535295,
        },
      ];
    }
    return res.status(200).send(response);
  }).catch((err) => {
    console.log(err.message);
    return res.status(500).send(err);
  });
}

function findBySlug(req, res) {
  const urlProfile = `${restaurantURL}byLink?link=${req.params.slug}`;
  const token = controller.getToken();
  rp({
    uri: urlProfile,
    headers: {
      Authorization: token,
    },
    json: true,
  }).then((response) => {
    const urlMenu = `${restaurantURL}${response.restaurant.id}/menu`;
    rp({
      uri: urlMenu,
      headers: {
        Authorization: token,
      },
      json: true,
    }).then((respMenu) => {
      if (response.restaurant) {
        response.restaurant.sections = respMenu.sections;
      }
      return res.status(200).send(response);
    });
  }).catch((err) => {
    console.log(err.message);
    return res.status(500).send(err);
  });
}

router.get('/', find);
router.get('/:slug', findBySlug);

module.exports = router;
