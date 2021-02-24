import React from 'react'
import { Button, Modal } from 'react-bootstrap'

type ConfirmModalType = {
  show: boolean
  onHide: () => void
  id: number
  onDelete: (id: number) => void
  title: string
}

const ConfirmModal: React.FC<ConfirmModalType> = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Подтвердите своё действие</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="w-100"
          onClick={() => {
            props.onDelete(props.id)
            props.onHide()
          }}
          variant="outline-danger"
        >
          {props.title}
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmModal
