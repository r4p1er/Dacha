import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadDocument,
  fetchAllDocuments,
} from "../../redux/actions/documents";
import fileExtentionRead from "../../utils/fileExtentionReader";
import FullPageLoader from "../Loader/Loader";
import { Col, Image, Row } from "react-bootstrap";

const Documents = (props) => {
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
    <Row>
      <Col>
        <h3 className="heading">Документы</h3>
        {!props.isAuth ? (
          <h3 className="text-center">
            Выполните вход для просмотра документов
          </h3>
        ) : !documentsState.documents.length ? (
          <h3 className="text-center">Документы отсутствуют</h3>
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
      </Col>
    </Row>
  );
};

export default Documents;
