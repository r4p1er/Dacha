import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import {
  downloadDoc,
  fetchAllDocuments,
  getDocuments,
} from '../../redux/index'
import { fileExtentionRead } from '../../common/utils/utils'
import { Loader } from '../index'
import DocumentCard from './Document-item/Document-item.component'
import { AppStateType } from '../../redux/store'
import { DocumentType } from '../../common/types/types'

const Documents: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllDocuments())
  }, [dispatch])
  const documents = useSelector((state: AppStateType) => getDocuments(state))

  const onDownload = (id: number, name: string) => {
    return dispatch(downloadDoc(id, name))
  }
  return (
    <Row>
      {!documents.length ? (
        <Loader />
      ) : !documents.length ? (
        <h3 className="w-100 text-center">Документы отсутствуют</h3>
      ) : (
        documents.map((doc: DocumentType) => (
          <DocumentCard
            key={doc.id}
            fileExtentionRead={fileExtentionRead}
            onDownload={onDownload}
            {...doc}
          />
        ))
      )}
    </Row>
  )
})

export default Documents
