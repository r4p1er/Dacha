import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";

const Documents = () => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const uploadFile = async (event) => {
    const formData = new FormData();
    formData.append('formFile', file);
    formData.append('fileName', fileName);
    try {
      const res = await axios.post("http://localhost:5000/api/documents", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
    
  
    return (
      <>
        <Container>
          <h1>Documents Page</h1>
          <Form enctype="multipart/form-data">
            <FormControl type="file" onChange={saveFile} />
            <Button variant="primary" onClick={uploadFile}>
              Загрузить документ
            </Button>
          </Form>
        </Container>
      </>
    );
}

export default Documents;
