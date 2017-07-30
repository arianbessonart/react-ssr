import React from 'react';
import { Link } from 'react-router-dom';

class RestaurantCard extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div>
        <Link to={`/restaurantes/montevideo/${item.link}-menu`}>{item.name} | {item.ratingScore}</Link>
      </div>
    );
  }
}

export default RestaurantCard;
