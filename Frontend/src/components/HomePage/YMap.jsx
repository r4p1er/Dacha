import React from "react";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import { Col } from "react-bootstrap";

const YMap = () => {
  return (
    <Col className="map-block" xl={12} lg={12} md={12} sm={12} xs={12}>
      <h3 className="heading">Карта СНТ«Покровские дачи»</h3>
      <div className="yandex-map">
        <YMaps>
          <Map
            defaultState={{ center: [55.300756, 36.773081], zoom: 15 }}
            options={{ minZoom: 13, maxZoom: 16 }}
            width="100%"
            height="100%"
          >
            <ZoomControl />
            <Placemark
              geometry={[55.300756, 36.773081]}
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              properties={{
                hintContent:
                  "Россия, Московская область, Наро-Фоминский городской округ, деревня Покровка",
              }}
            />
          </Map>
        </YMaps>
      </div>
    </Col>
  );
};

export default YMap;
