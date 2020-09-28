import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "./AdCard";
import { getAdverts } from "../../redux/actions/adverts";
import Loader from "../Loader/Loader";

const Adverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  const loading = useSelector((state) => state.app.loading);
  useEffect(() => {
    dispatch(getAdverts());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : !adverts.length ? (
        <h3>Объявления отсутствуют</h3>
      ) : (
        adverts.map((ad) => <AdCard key={ad.id} {...ad} />)
      )}
    </>
  );
};

export default Adverts;
