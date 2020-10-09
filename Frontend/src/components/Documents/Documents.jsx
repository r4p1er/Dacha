import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../redux/actions/documents";
import fileDownload from "js-file-download";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import icon_doc from "../../additions/icon_doc.png";
import icon_jpg from "../../additions/icon_jpg.png";
import icon_pdf from "../../additions/icon_pdf.png";
import icon_png from "../../additions/icon_png.png";
import icon_txt from "../../additions/icon_txt.png";
import icon_xls from "../../additions/icon_xls.png";

const Documents = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.docs.items);
  useEffect(() => {
    dispatch(getDocuments());
  }, []);

  const token = localStorage.jwtToken;
  const AuthStr = "Bearer ".concat(token);

  const fileExtentionRead = (name) => {
    const allowedExtention = name.match(
      /(\.doc|\.docx|\.jpg|\.jpeg|\.png|\.xls|\.xlsx|\.pdf|\.txt)$/i
    );
    let fileExtention = 1;
    !allowedExtention
      ? (fileExtention = 1)
      : (fileExtention = allowedExtention[0]);

    switch (fileExtention) {
      case ".doc":
        return icon_doc;
      case ".docx":
        return icon_doc;
      case ".jpg":
        return icon_jpg;
      case ".jpeg":
        return icon_jpg;
      case ".png":
        return icon_png;
      case ".xls":
        return icon_xls;
      case ".xlsx":
        return icon_xls;
      case ".pdf":
        return icon_pdf;
      case ".txt":
        return icon_txt;
      default:
        return icon_doc;
    }
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
                col="true" xl={3} lg={3} md={4} sm={6} xs={12}
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
