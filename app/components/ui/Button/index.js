import React from 'react';

class Button extends React.PureComponent {
  render() {
    const { onClick, children } = this.props;
    return (
      <button type="button" onClick={onClick}>{children}</button>
    );
  }
}

export default Button;
