import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdvert, fetchCurrentAdverts } from "../../redux/actions/adverts";
import AdCard from "./AdCard";

const CurrentAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.adverts);
  useEffect(() => {
    dispatch(fetchCurrentAdverts());
  }, []);

  const onDelete = (id) => dispatch(deleteAdvert(id));

  return (
    <>
      {!adverts.length ? (
        <h3>У вас нет объявлений</h3>
      ) : (
        adverts.reverse().map((ad) => <AdCard key={ad.id} onDelete={onDelete} {...ad}  />)
      )}
      
    </>
  );
};

export default CurrentAdverts;
