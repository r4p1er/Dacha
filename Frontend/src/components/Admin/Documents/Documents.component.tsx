import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import {
  getDocuments,
  downloadDoc,
  fetchAllDocuments,
  addDocument,
  deleteDoc,
  hideAlert,
  showAlert,
} from '../../../redux/index'
import { Loader, Alert } from '../../index'
import DocumentItem from './document-item/Document-item.component'
import { AppStateType } from '../../../redux/store'
import { DocumentType } from '../../../common/types/types'

const Documents: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllDocuments())
    dispatch(hideAlert())
  }, [dispatch])
  const documents = useSelector((state: AppStateType) => getDocuments(state))
  const alert = useSelector((state: AppStateType) => state.alerts.alert)

  const [file, setFile] = useState<Blob>()
  const [fileName, setFileName] = useState('')
  const saveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return
    } else {
      if (event.target.files[0] !== undefined) {
        setFile(event.target.files[0])
        setFileName(`${event.target.files[0].name}`)
        const label = document.querySelector('.choice-file-label')
        label!.innerHTML = event.target.files[0].name
      }
    }
  }

  const onDownload = (id: number, name: string) => {
    dispatch(downloadDoc(id, name))
  }

  const onDelete = (id: number) => {
    return dispatch(deleteDoc(id))
  }

  const uploadFile = () => {
    if (file !== undefined) {
      const formData = new FormData()
      formData.append('formFile', file)
      formData.append('fileName', fileName)
      dispatch(addDocument(formData))
      const label = document.querySelector('.choice-file-label')
      label!.innerHTML = 'Выберите файл'
      setFile(undefined)
      setFileName('')
    } else {
      dispatch(showAlert('Выберите файл'))
    }
  }
  return (
    <>
      <Container className="text-center">
        <Form
          encType="multipart/form-data"
          className="d-flex justify-content-center file-upload-form mb-3"
        >
          <input
            className="choice-file-input"
            id="file"
            name="file"
            type="file"
            onChange={saveFile}
          />
          <label
            className="btn btn-primary mb-0 mr-3 choice-file-label"
            htmlFor="file"
          >
            Выберите файл
          </label>
          <Button variant="primary" onClick={uploadFile}>
            Загрузить файл
          </Button>
        </Form>
        {alert && <Alert text={alert} />}
        <h2>Документы</h2>
        {!documents.length ? (
          <Loader />
        ) : !documents.length ? (
          <h3>Документы отсутствуют</h3>
        ) : (
          <Row>
            {documents.map((doc: DocumentType) => (
              <DocumentItem
                key={doc.id}
                onDelete={onDelete}
                onDownload={onDownload}
                {...doc}
              />
            ))}
          </Row>
        )}
      </Container>
    </>
  )
})

export default Documents
