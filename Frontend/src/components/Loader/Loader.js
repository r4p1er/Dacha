import React from 'react'
import { Button, Spinner } from "module";

export const Loader = () => (
    <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      role="status"
      aria-hidden="true"
    />
    Загрузка...
  </Button>
)