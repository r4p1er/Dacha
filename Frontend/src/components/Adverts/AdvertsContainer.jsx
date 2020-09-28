import React, { useState } from "react";
import { Button, ButtonGroup, Container, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import CreateAdvert from "./CreateAdvert";

const AdvertsContainer = () => {
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

  const [showAdsCreate, setshowAdsCreate] = useState(false);

  const handleCloseAdsCreate = () => setshowAdsCreate(false);
  const handleShowAdsCreate = () => setshowAdsCreate(true);

  return (
    <Styles>
      <Container fluid className="text-center">
        <ButtonGroup className="my-4">
          <Link className="btn btn-primary" to="/adverts/current_adverts">Мои объявления</Link>
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
        <Row>
          <Outlet />
        </Row>
      </Container>
    </Styles>
  );
};

export default AdvertsContainer;
