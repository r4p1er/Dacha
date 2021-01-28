import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadDoc, fetchAllDocuments } from '../../redux/apiCalls/documents'
import { fileExtentionRead } from '../../utils'
import FullPageLoader from '../Loader/Loader'
import { Row } from 'react-bootstrap'
import DocumentCard from './DocumentCard'

const Documents = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllDocuments())
  }, [dispatch])
  const documentsState = useSelector((state) => state.documents)
  const loading = documentsState.isLoading

  const onDownload = (id, name) => {
    return dispatch(downloadDoc(id, name))
  }
  return (
    <Row>
      {!documentsState.documents.length ? (
        <h3 className="text-center">Документы отсутствуют</h3>
      ) : loading ? (
        <FullPageLoader />
      ) : (
        documentsState.documents.map((doc) => (
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
}

export default Documents
