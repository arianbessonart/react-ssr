import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

class Layout extends React.Component {

  _onClick = () => {
    this.props.add();
    this.props.fetchRestaurants();
  }
  render () {
    return (
      <BrowserRouter>
        <switch>
          <Route exact path="/" component={Home} />
        </switch>
      </BrowserRouter>
    );
  }
}

export default Layout;
