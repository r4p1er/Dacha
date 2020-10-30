import React from "react";
import { Container, Row } from "react-bootstrap";
import About from "./About";
import NewsBlock from "./News/NewsBlock";
import GMap from "./GMap";

const HomeContainer = React.memo(() => {
  return (
      <Container className="home_container">
        <Row>
          <About />
          <NewsBlock />
        </Row>
        <Row className="mt-4">
          <GMap />
        </Row>
      </Container>
  );
});

export default HomeContainer;
