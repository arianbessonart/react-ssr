const rp = require('request-promise');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const controller = require('../controllers');
const channelService = require('../services/channels');
// const restaurantsURL = "http://stg-mobile-api.pedidosya.com/mobile/v2/restaurants?point=-34.9116033,-56.1594633&country=1&includePaymentMethods=MundiPagg,MercadoPago,VisaNet,Ticket%20Alimentaci%C3%B3n%20Online,Ticket%20Restaurant%20Online,Decidir&searchWithFeaturedProducts=true&offset=0&max=50";
const restaurantsURL = 'http://stg-mobile-api.pedidosya.com/mobile/v2/restaurants?&includePaymentMethods=MundiPagg,MercadoPago,VisaNet,Ticket%20Alimentaci%C3%B3n%20Online,Ticket%20Restaurant%20Online,Decidir';
const restaurantURL = 'http://stg-mobile-api.pedidosya.com/mobile/v2/restaurants/';
const initialDataURL = 'http://stg-mobile-api.pedidosya.com/mobile/v2/functions/countries';
const productsURL = 'http://stg-mobile-api.pedidosya.com/mobile/v2/products/1530855/optionGroups';

function find(req, res) {
  if (!req.query.point) {
    return res.status(400).send({ ok: false });
  }
  const filters = controller.encodeData(req.query);
  const { max, offset } = req;
  const url = `${restaurantsURL}&country=1&max=${max}&offset=${offset}&withFilters=true&searchWithFeaturedProducts=true&${filters}`;
  console.log(filters);
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
