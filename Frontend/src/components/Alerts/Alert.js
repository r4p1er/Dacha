import React from 'react';
import {Alert} from 'react-bootstrap';

export const AlertMessage = ({ text }) => (
  <Alert variant="warning">
    {text}
  </Alert>
)