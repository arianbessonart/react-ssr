import React from 'react';
import { connect } from 'react-redux';
import AwesomeComponent from './components/AwesomeComponent';
import { increment } from './actions';

class App extends React.Component {

  _onClick = () => {
    this.props.add();
  }
  render () {
    console.log(this.props);
    const { counter } = this.props;
    return <AwesomeComponent data={counter} onClick={this._onClick} />;
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch(increment());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
