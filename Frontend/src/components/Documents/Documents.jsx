import Axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
class Documents extends Component {
  state = {
    selectedFile: {},
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => Axios.post("http://localhost:5000/api/documents", this.state.selectedFile);
  
  render() {
    return (
      <>
        <Container>
          <h1>Documents Page</h1>
          <Form>
            <FormControl type="file" onChange={this.onFileChange} />
              <Button variant="primary" onClick={this.onFileUpload}>Загрузить документ</Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Documents;
