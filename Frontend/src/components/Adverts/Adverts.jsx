import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "./AdCard";
import FullPageLoader from "../Loader/Loader";
import { fetchAllAdverts } from "../../redux/actions/adverts";
import { Row } from "react-bootstrap";

const Adverts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, [dispatch]);
  const advertState = useSelector((state) => state.adverts);
  const loading = advertState.isLoading;
  return (
    <>
      {!advertState.adverts.length ? (
        <h3>Объявления отсутствуют</h3>
      ) : loading ? (
        <FullPageLoader />
      ) : (
        <Row>
          {[...advertState.adverts].reverse().map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </Row>
      )}
    </>
  );
};

export default Adverts;
