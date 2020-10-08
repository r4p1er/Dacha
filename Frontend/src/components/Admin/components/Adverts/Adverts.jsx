import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdverts } from "../../../../redux/actions/adverts";
import AdvertItem from "./AdvertItem";

const News = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [])
  const adverts = useSelector((state) => state.adverts.adverts);
  return (
    <>
      <h2>Объявления</h2>
        <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Участок</th>
              <th>Заголовок</th>
              <th>Объявление</th>
              <th>Контакты</th>
            </tr>
          </thead>
          <tbody>
            {!adverts.length ? (
              <tr>
                <td>Объявления отсутствуют</td>
              </tr>
            ) : (
              adverts.map((ad, index) => <AdvertItem key={ad.id} index={index} {...ad} />)
            )}
          </tbody>
        </Table>
    </>
  );
};

export default News;
