import React from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdvert, fetchCurrentAdverts } from "../../redux/actions/adverts";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.adverts);
  useEffect(() => {
    dispatch(fetchCurrentAdverts());
  }, [dispatch]);

  const onDelete = (id) => dispatch(deleteAdvert(id));

  return (
    <>
      <Row className="text-center">
        {!adverts.length ? (
          <h3>У вас нет объявлений</h3>
        ) : (
          adverts
            .reverse()
            .map((ad) => <AdCard key={ad.id} onDelete={onDelete} {...ad} />)
        )}
      </Row>
    </>
  );
};

export default CurrentAdverts;
