import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdverts } from "../../redux/actions/adverts";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  dispatch(fetchAllAdverts())

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
