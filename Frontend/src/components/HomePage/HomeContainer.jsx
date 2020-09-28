import React from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";
import About from "./About";
import NewsBlock from "./News/NewsBlock";
import GMap from "./GMap";

const HomeContainer = (isNotFound) => {
  const Styles = styled.div`
    .google-map {
      width: 100%;
      border: 0;
      height: 350px;
      border-radius: 3px;
      box-shadow: 0 5px 11px rgba(0, 0, 0, 0.2);
    }
    h1,
    h2 {
      margin-bottom: 20px;
    }
    p {
      color: #444444;
    }
  `;
  isNotFound.isNotFound(false)
  return (
    <Styles>
      <Container>
          <Row>
            <About />
            <NewsBlock />
          </Row>
          <Row className="mt-4">
            <GMap />
          </Row>
        </Container>
    </Styles>
  );
};

export default HomeContainer;
