import React from 'react';
import RestaurantCard from '../RestaurantCard';

class RestaurantList extends React.PureComponent {

  _buildList = () => {
    return this.props.items ?
      this.props.items.map((r, idx) => {
        return (<RestaurantCard key={`${idx}-rc`} item={r} />);
      })
      : null;
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        {this._buildList()}
      </div>
    );
  }
}

export default RestaurantList;
