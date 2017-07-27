import React from 'react';
import { connect } from 'react-redux';
import AwesomeComponent from './components/AwesomeComponent';
import { increment, fetchRestaurants } from './actions/index.js';

class App extends React.Component {

  _onClick = () => {
    this.props.add();
    this.props.fetchRestaurants();
  }
  render () {
    console.log(this.props);
    const { counter, restaurants } = this.props;
    return <AwesomeComponent data={counter} restaurants={restaurants} onClick={this._onClick} />;
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  restaurants: state.restaurants,
});

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch(increment());
    },
    fetchRestaurants: () => {
      dispatch(fetchRestaurants());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
