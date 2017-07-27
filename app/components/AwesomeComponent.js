import React from 'react';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _buildList = () => {
    console.log(this.props.restaurants);
    return this.props.restaurants ?
      this.props.restaurants.map((r, idx) => {
        return (<div key={`${idx}-rc`}>{r.name}</div>);
      })
      : null;
  }

  render() {
    return (
      <div>
        Component
        Count : <span>{this.props.data}</span>|<span>{this.props.restaurants.length}</span>
        <div><button onClick={this.props.onClick}>Add</button></div>
        {this._buildList()}
      </div>
    );
  }

}

export default AwesomeComponent;
