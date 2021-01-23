import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAdverts,
  deleteAdvert,
} from "../../../../redux/actions/adverts";
import AdvertItem from "./AdvertItem";

const News = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);
  const adverts = useSelector((state) => state.adverts.adverts);
  const onDelete = (id) => dispatch(deleteAdvert(id));
  return (
    <>
      {!adverts.length ? (
        <h3 className="text-center">Объявления отсутствуют</h3>
      ) : (
        <Table
          className="admin-table"
          size="sm"
          responsive
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Участок</th>
              <th>Заголовок</th>
              <th>Объявление</th>
              <th>Контакты</th>
              <th>Дата</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adverts.map((ad, index) => (
              <AdvertItem
                key={ad.id}
                index={index}
                onDelete={onDelete}
                {...ad}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default News;
