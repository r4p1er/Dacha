import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { id, type, text } = this.props.message;
    return (
      <Alert variant={type === 'success' ? 'success' : 'danger'} onClose={this.onClick} dismissible>
        {text}
      </Alert>
    );
  }
}

export default FlashMessage;