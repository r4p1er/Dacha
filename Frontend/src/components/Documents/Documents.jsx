import axios from "axios";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../redux/actions/documents";
import fileDownload from "js-file-download";
import { Button, Container } from "react-bootstrap";

const Documents = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.docs.items);
  useEffect(() => {
    dispatch(getDocuments());
  }, []);

  const token = localStorage.jwtToken;
  const AuthStr = "Bearer ".concat(token);
 
  return (
    <>
      <Container>
        <h1>Документы</h1>
        {documents.map((doc) => (
          <Button
            key={doc.id}
            variant="primary"
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
            {doc.name}
          </Button>
        ))}
      </Container>
    </>
  );
};

export default Documents;
