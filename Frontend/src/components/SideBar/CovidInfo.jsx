import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import dateFormater from "../../utils/dateFormater";

const CovidInfo = () => {
  const [stat, setStat] = useState([]);
  const lastUpdateTime = stat.lastUpdatedAtSource;
  const numFormater = (number) => new Intl.NumberFormat("ru-RU").format(number);
  useEffect(() => {
    fetch(
      "https://api.apify.com/v2/key-value-stores/1brJ0NLbQaJKPTWMO/records/LATEST?disableRedirect=true"
    )
      .then((res) => res.json())
      .then((result) => {
        setStat(result);
      });
  }, []);
  return (
    <div className="covid-stat-block">
      <h5>Коронавирус: статистика</h5>
      <div className="p-2">
        <h6>Информация на {dateFormater(lastUpdateTime)}, Россия</h6>
        <div className="mt-1 info-window">
          <Row>
            <Col>
              <h6>Заражения</h6>
              <span>{numFormater(stat.infected)}</span>
            </Col>
            <Col>
              <h6>Смерти</h6>
              <span>{numFormater(stat.deceased)}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Выздоровления</h6>
              <span>{numFormater(stat.recovered)}</span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CovidInfo;
