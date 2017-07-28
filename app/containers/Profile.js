import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {

  render () {
    return (
      <h1>
        PROFILE
      </h1>
    );
  }
}

export default connect(null, null)(Profile);
