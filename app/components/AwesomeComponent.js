import React from 'react';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Count : <span>{this.props.data}</span>
        <div><button onClick={this.props.onClick}>Add</button></div>
      </div>
    );
  }

}

export default AwesomeComponent;
