import React from "react";
import { Col } from "react-bootstrap";

const GMap = () => {
  return (
    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
      <h2>Где мы</h2>
      <iframe
        className="google-map"
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4542.323607077046!2d36.77054922810546!3d55.30279588935118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46cab66fc9457109%3A0xe666e99ea9bb23fa!2z0J_QvtC60YDQvtCy0LrQsCwg0JzQvtGB0LrQvtCy0YHQutCw0Y8g0L7QsdC7LiwgMTQzMzIy!5e0!3m2!1sru!2sru!4v1598881490210!5m2!1sru!2sru"
      ></iframe>
    </Col>
  );
};

export default GMap;