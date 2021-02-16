import React from 'react'
import { Col, Image } from 'react-bootstrap'

type DocumentCardPropType = {
  onDownload: (id: number, name: string) => void
  fileExtentionRead: (name: string) => string
  id: number
  name: string
}

const DocumentCard: React.FC<DocumentCardPropType> = React.memo(
  ({ onDownload, id, name, fileExtentionRead }) => {
    return (
      <Col
        className="doc-item-container my-2"
        xl={3}
        lg={3}
        md={4}
        sm={6}
        xs={12}
      >
        <div className="doc-item d-flex flex-column align-items-center">
          <Image
            className="cursor-pointer"
            width="32"
            src={fileExtentionRead(name)}
            onClick={() => {
              onDownload(id, name)
            }}
            alt={name}
          />
          <span
            className="cursor-pointer text-center"
            onClick={() => {
              onDownload(id, name)
            }}
          >
            {name}
          </span>
        </div>
      </Col>
    )
  }
)

export default DocumentCard
