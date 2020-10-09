import React, { useState } from "react";
import { Button, ButtonGroup, Container, Modal, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import CreateAdvert from "./CreateAdvert";

const AdvertsContainer = () => {
  const [showAdsCreate, setshowAdsCreate] = useState(false);

  const handleCloseAdsCreate = () => setshowAdsCreate(false);
  const handleShowAdsCreate = () => setshowAdsCreate(true);

  return (
    <Container fluid className="text-center">
      <ButtonGroup className="my-4">
        <Link className="btn btn-primary" to="/adverts/current_adverts">
          Мои объявления
        </Link>
        <Button onClick={handleShowAdsCreate}>Создать объявление</Button>
      </ButtonGroup>
      <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Создание объявления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAdvert handleCloseAdsCreate={handleCloseAdsCreate} />
        </Modal.Body>
      </Modal>
      <Container fluid className="text-center">
        <Outlet />
      </Container>
    </Container>
  );
};

export default AdvertsContainer;
