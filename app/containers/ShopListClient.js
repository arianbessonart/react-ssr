import React from 'react';
import { connect } from 'react-redux';
import RestaurantList from '../components/Restaurant/RestaurantList';
import { fetchRestaurants } from '../actions/index.js';

class ShopListClient extends React.Component {

  componentDidMount() {
    this.props.fetchRestaurants();
  }

  render () {
    const { restaurants } = this.props;
    return (
      <div>
        <h3>LAYOUT</h3>
        <RestaurantList items={restaurants} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopListClient);
