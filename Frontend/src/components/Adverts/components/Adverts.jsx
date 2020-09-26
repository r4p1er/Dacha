import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Container,
  ButtonGroup,
  Button,
  Row,
  Modal,
  Form,
} from "react-bootstrap";
import styled from "styled-components";
import AdCard from "./AdCard";
import { getAdverts } from "../../../redux/actions/ads";

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

export function Adverts() {

  const dispatch = useDispatch()
  const adverts = useSelector(state => state.adverts.istems)

  useEffect(()=>{
    dispatch(getAdverts())
  }, [])

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
            {adverts.map(ad => <AdCard key={ad.id} {...ad}/>)}
          </Row>
          <Modal show={showAdsCreate} onHide={handleCloseAdsCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Создание объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="mb-1">
                    Введите заголовок объявления
                  </Form.Label>
                  <Form.Control placeholder="Максимум 50 символов" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-1">
                    Введите текст объявления
                  </Form.Label>
                  <Form.Control
                    style={{ resize: "none" }}
                    placeholder="Максимум 2000 символов"
                    as="textarea"
                    rows="8"
                  />
                </Form.Group>
                <Button variant="outline-primary" type="submit">
                  Создать объявление
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Просмотр объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Заголовок объявления</h3>
              <p>
                Occaecat id et dolor eiusmod irure consequat ea laborum culpa
                dolor excepteur culpa irure. Consequat sunt nostrud adipisicing
                culpa voluptate. Amet ipsum cupidatat et nulla sit laborum in
                nisi quis. Ad commodo tempor consequat occaecat velit sint
                incididunt est deserunt eu. Velit aliqua aliquip id voluptate in
                ut velit laboris esse labore aliquip nulla. Nulla minim
                exercitation dolor anim proident ullamco ex eu ut aliquip
                cupidatat reprehenderit velit. Tempor sunt irure pariatur
                cupidatat mollit non voluptate sint aliquip enim ex cupidatat
                sunt. Esse nulla sint voluptate officia sit qui officia. Nostrud
                nostrud velit laborum sunt elit aliqua amet mollit nulla
                occaecat ullamco. Et dolor ad sint labore et aliqua nisi labore
                magna mollit mollit elit. Consequat consectetur adipisicing
                tempor incididunt. Eiusmod ullamco nostrud aliquip ex ex est
                cupidatat amet id laboris officia consequat eu dolor. Ipsum et
                veniam fugiat eiusmod. In cupidatat adipisicing et minim.
                Occaecat id et dolor eiusmod irure consequat ea laborum culpa
                dolor excepteur culpa irure. Consequat sunt nostrud adipisicing
                culpa voluptate. Amet ipsum cupidatat et nulla sit laborum in
                nisi quis. Ad commodo tempor consequat occaecat velit sint
                incididunt est deserunt eu. Velit aliqua aliquip id voluptate in
                ut velit laboris esse labore aliquip nulla. Nulla minim
                exercitation dolor anim proident ullamco ex eu ut aliquip
                cupidatat reprehenderit velit.
              </p>
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
}