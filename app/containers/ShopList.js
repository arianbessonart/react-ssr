import React from 'react';
import { connect } from 'react-redux';
import RestaurantList from '../components/Restaurant/RestaurantList';
import { fetchRestaurants } from '../actions/index.js';

class ShopList extends React.Component {

  static fetchData(store) {
    return store.dispatch(fetchRestaurants());
  }

  componentDidMount() {
  }

  render () {
    const { restaurants } = this.props;
    return (
      <RestaurantList items={restaurants} />
    );
  }
}

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: () => {
      dispatch(fetchRestaurants());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);
