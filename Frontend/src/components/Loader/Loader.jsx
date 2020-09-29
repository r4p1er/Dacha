import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <Spinner as="span" animation="border" role="status" aria-hidden="true" />
);

export default Loader;
