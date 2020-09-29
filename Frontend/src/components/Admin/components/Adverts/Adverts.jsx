import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAdverts } from "../../../../redux/actions/adverts";
import Loader from "../../../Loader/Loader";
import AdvertItem from "./AdvertItem";

const News = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  const loading = useSelector((state) => state.app.loading);
  useEffect(() => {
    dispatch(getAdverts());
  }, []);
  return (
    <>
      <h2>Объявления</h2>
      {loading ? (
        <Loader />
      ) : (
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
              adverts.map((ad) => <AdvertItem key={ad.id} {...ad} />)
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default News;
