import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadDoc, fetchAllDocuments } from '../../redux/apiCalls/documents'
import { getDocuments } from '../../redux/selectors/documentsSelectors'
import { fileExtentionRead } from '../../utils'
import Loader from '../Loader/Loader'
import { Row } from 'react-bootstrap'
import DocumentCard from './DocumentCard'

const Documents = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllDocuments())
  }, [dispatch])
  const documents = useSelector((state) => getDocuments(state))

  const onDownload = (id, name) => {
    return dispatch(downloadDoc(id, name))
  }
  return (
    <Row>
      {!documents.length ? (
        <Loader />
      ) : !documents.length ? (
        <h3 className="w-100 text-center">Документы отсутствуют</h3>
      ) : (
        documents.map((doc) => (
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
