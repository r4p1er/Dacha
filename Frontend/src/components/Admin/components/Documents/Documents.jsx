import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDocument,
  fetchAllDocuments,
  addDocument,
} from "../../../../redux/actions/documents";
import fileExtentionRead from "../../../../utils/fileExtentionReader";

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
        <Row>
          {!documents.length ? (
            <h3>Документы отсутствуют</h3>
          ) : (
            documents.map((doc) => (
              <Col
                className="doc-item-container my-2"
                col="true"
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                key={doc.id}
                onClick={() => {
                  onDownload(doc.id, doc.name);
                }}
              >
                <div className="doc-item d-flex flex-column align-items-center">
                  <Image
                    className="mr-2"
                    width="32"
                    src={fileExtentionRead(doc.name)}
                  />
                  <span className="doc-name">{doc.name}</span>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default Documents;
