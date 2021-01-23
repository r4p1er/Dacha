import React from "react";
import { Row } from "react-bootstrap";
import About from "./About";
import YMap from "./YMap";
import Contacts from "./Contacts";

const HomeContainer = React.memo(() => {
  return (
    <div className="home-container">
      <Row>
        <About />
        <Contacts />
      </Row>
      <Row className="mt-4">
        <YMap />
      </Row>
    </div>
  );
});

export default HomeContainer;
