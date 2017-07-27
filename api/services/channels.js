const _ = require('lodash');

function addFakesChannels(filters, initChannels) {
  let newChannels = filters.channels || [];
  if (filters.onlinePayment && filters.onlinePayment.total > 0) {
    const opChannel = initChannels.find((c) => c.keyName === 'online_payment');
    if (opChannel) {
      opChannel.total = filters.onlinePayment.total;
      newChannels = newChannels.filter((i) => i.id !== opChannel.id);
      newChannels.push(opChannel);
    }
  }
  if (filters.stamps && filters.stamps.total > 0) {
    const stampsChannel = initChannels.find((c) => c.keyName === 'stamps');
    if (stampsChannel) {
      stampsChannel.total = filters.stamps.total;
      newChannels = newChannels.filter((i) => i.id !== stampsChannel.id);
      newChannels.push(stampsChannel);
    }
  }
  if (filters.favorites && filters.favorites.total > 0) {
    const favChannel = initChannels.find((c) => c.keyName === 'favorites');
    if (favChannel) {
      favChannel.total = filters.favorites.total;
      newChannels = newChannels.filter((i) => i.id !== favChannel.id);
      newChannels.push(favChannel);
    }
  }
  if (filters.discount && filters.discount.total > 0) {
    const discountChannel = initChannels.find((c) => c.keyName === 'discount');
    if (discountChannel) {
      discountChannel.total = filters.discount.total;
      newChannels = newChannels.filter((i) => i.id !== discountChannel.id);
      newChannels.push(discountChannel);
    }
  }
  newChannels = _.sortBy(newChannels, ['index']);
  filters.channels = newChannels;
  return filters;
}

module.exports = {
  addFakesChannels,
};
