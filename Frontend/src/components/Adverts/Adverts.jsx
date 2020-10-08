import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCard from "./AdCard";
import { fetchAllAdverts } from "../../redux/actions/adverts";
import { Container } from "react-bootstrap";

const Adverts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAdverts());
  }, []);
  const adverts = useSelector((state) => state.adverts.adverts);
  return (
    <>
      <Container fluid className="text-center">
        {!adverts.length ? (
          <h3>Объявления отсутствуют</h3>
        ) : (
          adverts.reverse().map((ad) => <AdCard key={ad.id} {...ad} />)
        )}
      </Container>
    </>
  );
};

export default Adverts;
