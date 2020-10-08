import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../redux/actions/documents";
import fileDownload from "js-file-download";
import { Button, Container, Form, FormControl } from "react-bootstrap";

const Documents = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.docs.items);
  useEffect(() => {
    dispatch(getDocuments());
  }, []);

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
      <Container>
        <h1>Documents Page</h1>
        <Form encType="multipart/form-data">
          <FormControl type="file" onChange={saveFile} />
          <Button variant="primary" onClick={uploadFile}>
            Загрузить документ
          </Button>
        </Form>
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
                  console.log(response);
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
