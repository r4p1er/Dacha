import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDocument,
  fetchAllDocuments,
} from "../../redux/actions/documents";
import fileExtentionRead from "../../utils/fileExtentionReader";
import { Col, Container, Image, Row } from "react-bootstrap";

const Documents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);
  const documents = useSelector((state) => state.docs.documents);

  const onDownload = (id, name) => {
    return dispatch(downloadDocument(id, name));
  };

  return (
    <>
      <Container className="text-center">
        <h1>Документы</h1>
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
