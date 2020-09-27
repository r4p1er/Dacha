import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, ButtonGroup, Button, Row, Modal } from "react-bootstrap";
import styled from "styled-components";
import AdCard from "./AdCard";
import CreateAdvert from "./CreateAdvert";
import { getAdverts } from "../../redux/actions/adverts";
import { getProfiles } from "../../redux/actions/profiles";

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
  useEffect(() => {
    dispatch(getAdverts());
  }, []);

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
            {adverts.map((ad) => (
              <AdCard key={ad.id} {...ad}/>
            ))}
          </Row>
          <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Создание объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateAdvert />
            </Modal.Body>
          </Modal>
          <Modal size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Просмотр объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Заголовок объявления</h3>
              <p></p>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
              <Row>
                <span className="mr-4">Контакты:</span>
                <span>89174558285, @mail ...</span>
              </Row>
            </Modal.Footer>
          </Modal>
        </Container>
      </Styles>
    </>
  );
};

export default Adverts;
