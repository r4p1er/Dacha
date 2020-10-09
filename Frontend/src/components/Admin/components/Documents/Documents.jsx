import axios from "axios";
import fileDownload from "js-file-download";
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
import { getDocuments } from "../../../../redux/actions/documents";
import fileExtentionRead from "../../../../utils/fileExtentionReader";

const Documents = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.docs.items);
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  const token = localStorage.jwtToken;
  const AuthStr = "Bearer ".concat(token);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const uploadFile = async (event) => {
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Container className="text-center">
        <Form encType="multipart/form-data" className="d-flex justify-content-center">
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
                  axios
                    .get(`http://localhost:5000/api/documents/${doc.id}`, {
                      responseType: "blob",
                      headers: { Authorization: AuthStr },
                    })
                    .then((response) => {
                      fileDownload(response.data, `${doc.name}`);
                    });
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
