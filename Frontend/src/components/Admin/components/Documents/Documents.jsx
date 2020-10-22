import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import {
  downloadDocument,
  fetchAllDocuments,
  addDocument,
  deleteDocument,
} from "../../../../redux/actions/documents";
import { Button, Container, Form, FormControl, Row } from "react-bootstrap";

const Documents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);
  const documents = useSelector((state) => state.docs.documents);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (event) => {
    if (event.target.files[0] !== undefined) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const onDownload = (id, name) => {
    dispatch(downloadDocument(id, name));
  };

  const onDelete = (id) => {
    return dispatch(deleteDocument(id));
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);
    dispatch(addDocument(formData));
  };

  return (
    <>
      <Container className="text-center">
        <Form
          encType="multipart/form-data"
          className="d-flex justify-content-center"
        >
          <FormControl type="file" onChange={saveFile} />
          <Button block variant="primary" onClick={uploadFile}>
            Загрузить документ
          </Button>
        </Form>
        <h2>Документы</h2>
        {!documents.length ? (
          <h3>Документы отсутствуют</h3>
        ) : (
          <Row>
            {documents.map((doc) => (
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
  );
};

export default Documents;
