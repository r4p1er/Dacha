import React from "react";
import { Alert } from "react-bootstrap";

export const AlertMessage = React.memo(({ text }) => {
  return <Alert variant="warning">{text}</Alert>;
});
