import React from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdvert, fetchCurrentAdverts } from "../../redux/actions/adverts";
import FullPageLoader from "../Loader/Loader";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentAdverts());
  }, [dispatch]);
  const advertsState = useSelector((state) => state.adverts);
  const loading = advertsState.isLoading;

  const onDelete = (id) => dispatch(deleteAdvert(id));

  return (
    <>
      {!advertsState.adverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : loading ? (
        <FullPageLoader />
      ) : (
        <Row className="text-center">
          {[...advertsState.adverts].reverse().map((ad) => (
            <AdCard key={ad.id} onDelete={onDelete} {...ad} />
          ))}
        </Row>
      )}
    </>
  );
};

export default CurrentAdverts;
