import React, { useState } from 'react'
import { Col, Image } from 'react-bootstrap'
import deleteDocIcon from '../../../../../additions/deleteDocument.png'
import { fileExtentionRead } from '../../../../../utils'
import { ConfirmModal } from '../../../../common'

type DocumentItemPropType = {
  onDownload: (id: number, name: string) => void
  onDelete: (id: number) => void
  id: number
  name: string
}

const DocumentItem: React.FC<DocumentItemPropType> = React.memo(
  ({ id, onDelete, name, onDownload }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleClose = () => setShowDeleteModal(false)
    const handleShow = () => setShowDeleteModal(true)

    return (
      <>
        <Col
          className="doc-item-container my-2"
          xl={3}
          lg={3}
          md={4}
          sm={6}
          xs={12}
        >
          <div className="doc-item d-flex flex-column align-items-center">
            <div className="doc-item-icons d-flex">
              <Image
                className="mr-1 cursor-pointer"
                width="32"
                src={fileExtentionRead(name)}
                alt={name}
                onClick={() => {
                  onDownload(id, name)
                }}
              />
              <Image
                className="cursor-pointer"
                height="16"
                src={deleteDocIcon}
                onClick={handleShow}
                alt="Удалить"
              />
            </div>
            <span
              className="cursor-pointer"
              onClick={() => {
                onDownload(id, name)
              }}
            >
              {name}
            </span>
          </div>
        </Col>
        <ConfirmModal
          show={showDeleteModal}
          onHide={handleClose}
          title="Удалить документ"
          onDelete={onDelete}
          id={id}
        />
      </>
    )
  }
)

export default DocumentItem
