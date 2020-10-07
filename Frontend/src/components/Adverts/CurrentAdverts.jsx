import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentAdverts } from "../../redux/actions/adverts";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentAdverts());
  }, []);
  const adverts = useSelector((state) => state.adverts.items);

  return (
    <>
      {!adverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : (
        adverts.map((ad) => <AdCard key={ad.id} {...ad} />)
      )}
    </>
  );
};

export default CurrentAdverts;
