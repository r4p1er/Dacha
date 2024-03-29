import React from 'react'
import { Alert } from 'react-bootstrap'

type AlertPropType = {
  text: string
}

const AlertMessage: React.FC<AlertPropType> = ({ text }) => {
  return (
    <Alert variant="warning" className="text-center">
      {text}
    </Alert>
  )
}

export default AlertMessage
