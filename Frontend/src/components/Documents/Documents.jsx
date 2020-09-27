import axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedFile: null}
  }

  onFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  onFileUpload = () => {
    const data = new FormData()
    data.append(`${this.state.selectedFile.name}`, this.state.selectedFile)
    axios.post("http://localhost:5000/api/documents", data);
  };

  render() {
    return (
      <>
        <Container>
          <h1>Documents Page</h1>
          <Form enctype="multipart/form-data" method="post" onSubmit={this.onFileUpload}>
            <FormControl type="file" onChange={this.onFileChange} />
            <Button variant="primary" type="submit">
              Загрузить документ
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Documents;
