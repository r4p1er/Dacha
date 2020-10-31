import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import {
  downloadDocument,
  fetchAllDocuments,
  addDocument,
  deleteDocument,
} from "../../../../redux/actions/documents";
import { showAlert } from "../../../../redux/actions/AlertMessages";
import { Button, Container, Form, Row } from "react-bootstrap";
import { AlertMessage } from "../../../Alerts/Alert";

const Documents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);
  const documents = useSelector((state) => state.docs.documents);
  const alert = useSelector((state) => state.app.alert);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const saveFile = (event) => {
    if (event.target.files[0] !== undefined) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      const label = document.querySelector(".choice-file-label");
      label.innerHTML = event.target.files[0].name;
    }
  };

  const onDownload = (id, name) => {
    dispatch(downloadDocument(id, name));
  };

  const onDelete = (id) => {
    return dispatch(deleteDocument(id));
  };

  const uploadFile = () => {
    if (file !== undefined) {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("fileName", fileName);
      dispatch(addDocument(formData));
      const label = document.querySelector(".choice-file-label");
      label.innerHTML = "Выберите файл";
      setFile(undefined);
      setFileName(undefined);
    } else {
      dispatch(showAlert("Выберите файл"))
    }
  };
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
        {alert && <AlertMessage text={alert} />}
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
