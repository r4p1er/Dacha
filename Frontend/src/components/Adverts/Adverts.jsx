import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ButtonGroup, Button, Row, Modal } from "react-bootstrap";
import styled from "styled-components";
import AdCard from "./AdCard";
import CreateAdvert from "./CreateAdvert";
import { getAdverts } from "../../redux/actions/adverts";
import Loader from "../Loader/Loader";


const Styles = styled.div`
  .card {
    margin-bottom: 1rem;
    &:hover,
    &:active,
    &:focus {
      border-radius: 3px;
      box-shadow: 0 5px 11px rgba(0, 0, 0, 0.2);
    }
  }
  .card-body {
    height: 300px;
    overflow: hidden;
  }
`;

const Adverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts.items);
  const loading = useSelector((state) => state.app.loading)
  useEffect(() => {
    dispatch(getAdverts());
  },[]);

  const [showAdsCreate, setshowAdsCreate] = useState(false);

  const handleCloseAdsCreate = () => setshowAdsCreate(false);
  const handleShowAdsCreate = () => setshowAdsCreate(true);

  return (
    <>
      <Styles>
        <Container fluid className="text-center">
          <ButtonGroup className="my-4">
            <Button>Мои объявления</Button>
            <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
          </ButtonGroup>
          <Row>
            { loading ? <Loader /> : !adverts.length ? <h3>Объявления отсутствуют</h3> :adverts.map(ad => <AdCard key={ad.id} {...ad}/>)}
          </Row>
          <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Создание объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate}/>
            </Modal.Body>
          </Modal>
        </Container>
      </Styles>
    </>
  );
};

export default Adverts;
