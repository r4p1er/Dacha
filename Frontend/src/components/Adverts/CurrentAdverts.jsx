import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAdverts } from "../../redux/actions/adverts";
import Loader from "../Loader/Loader";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  const loading = useSelector((state) => state.app.loading);
  useEffect(() => {
    dispatch(getCurrentAdverts());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !adverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : (
        adverts.map((ad) => <AdCard key={ad.id} {...ad} />)
      )}
    </>
  );
};

export default CurrentAdverts;
