import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import "./AdminContainer.css";
import { AdminNews, AdminDocs, AdminAds, AdminVote, AdminProfiles } from "./components/index";

const AdminContainer = () => {
  return (
    <>
      <h1>Администрирование сайта</h1>
      <ButtonGroup vertical size="lg">
        <Button>
          <Link to="/admin/news">Новости</Link>
        </Button>
        <Button>
          <Link to="/admin/adverts">Объявления</Link>
        </Button>
        <Button>
          <Link to="/admin/documents">Документы</Link>
        </Button>
        <Button>
          <Link to="/admin/vote">Голосование</Link>
        </Button>
        <Button>
          <Link to="/admin/profiles">Профили</Link>
        </Button>
      </ButtonGroup>
      {/* <Switch>
        <Route exact path="/admin/news" component={AdminNews}/>
        <Route exact path="/admin/adverts" component={AdminAds}/>
        <Route exact path="/admin/documents" component={AdminDocs}/>
        <Route exact path="/admin/vote" component={AdminVote}/>
        <Route exact path="/admin/profiles" component={AdminProfiles}/>
      </Switch> */}
    </>
  );
};

export default AdminContainer;
