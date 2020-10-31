import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDocument,
  fetchAllDocuments,
} from "../../redux/actions/documents";
import fileExtentionRead from "../../utils/fileExtentionReader";
import FullPageLoader from "../Loader/Loader";
import { Col, Container, Image, Row } from "react-bootstrap";

const Documents = React.memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);
  const documentsState = useSelector((state) => state.docs);
  const loading = documentsState.isLoading;

  const onDownload = (id, name) => {
    return dispatch(downloadDocument(id, name));
  };
  return (
    <>
      <Container className="text-center">
        <h1>Документы</h1>
        {!documentsState.documents.length ? (
          <h3>Документы отсутствуют</h3>
        ) : loading ? (
          <FullPageLoader />
        ) : (
          <Row>
            {documentsState.documents.map((doc) => (
              <Col
                className="doc-item-container my-2"
                col="true"
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                key={doc.id}
              >
                <div className="doc-item d-flex flex-column align-items-center">
                  <Image
                    className="cursor-pointer"
                    width="32"
                    src={fileExtentionRead(doc.name)}
                    onClick={() => {
                      onDownload(doc.id, doc.name);
                    }}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      onDownload(doc.id, doc.name);
                    }}
                  >
                    {doc.name}
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
});

export default Documents;
