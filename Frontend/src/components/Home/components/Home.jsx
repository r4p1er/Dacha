import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../redux/actions/news";
import styled from "styled-components";
import NewsCard from "./NewsCard";
import { Container, Row, Col } from "react-bootstrap";

const Styles = styled.div`
  .google-map {
    width: 100%;
    border: 0;
    height: 350px;
    border-radius: 3px;
    box-shadow: 0 5px 11px rgba(0, 0, 0, 0.2);
  }
  h1,
  h2 {
    margin-bottom: 20px;
  }
  p {
    color: #444444;
  }
`;

const Home = () => {

  const dispatch = useDispatch()
  const news = useSelector(state => state.news.items)
  useEffect(()=>{
    dispatch(getNews())
  }, [])

  return (
    <>
      <Styles>
        <Container>
          <Row>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <h2>О нас</h2>
              <p>
                lorLabore esse aliqua aute ad. Ullamco Lorem irure adipisicing
                nostrud Lorem. Occaecat nulla nostrud deserunt quis voluptate.
                Id veniam reprehenderit aute exercitation adipisicing cillum
                velit irure officia dolor excepteur amet qui minim. Laboris
                aliqua incididunt minim officia nisi pariatur ipsum enim ea
                mollit nostrud fugiat non. Magna sit excepteur pariatur sit
                consectetur cupidatat officia officia laborum Lorem enim esse.
                Tempor proident excepteur nostrud voluptate adipisicing tempor
                anim reprehenderit irure mollit occaecat laboris. Cillum fugiat
                id culpa sint quis dolore laboris quis ea id anim velit nostrud.
                Proident magna ullamco sint reprehenderit ullamco. Id commodo
                minim labore ex anim ipsum. Velit voluptate consequat proident
                quis enim adipisicing incididunt culpa eiusmod elit in dolor.
              </p>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <h2>Новости</h2>
              {news.map(someNews => <NewsCard key={someNews.id} {...someNews}/>)}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col  xl={12} lg={12} md={12} sm={12} xs={12}>
              <h2>Где мы</h2>
              <iframe
                className="google-map" title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4542.323607077046!2d36.77054922810546!3d55.30279588935118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46cab66fc9457109%3A0xe666e99ea9bb23fa!2z0J_QvtC60YDQvtCy0LrQsCwg0JzQvtGB0LrQvtCy0YHQutCw0Y8g0L7QsdC7LiwgMTQzMzIy!5e0!3m2!1sru!2sru!4v1598881490210!5m2!1sru!2sru"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </Styles>
    </>
  );
}

export default Home;