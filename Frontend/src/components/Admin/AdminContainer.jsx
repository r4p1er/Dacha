import React from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Link, Route } from "react-router-dom";
import "./AdminContainer.css";

const AdminContainer = () => {
  return (
    <>
      <h1>Администрирование сайта</h1>
      <ButtonGroup vertical size="lg">
        <Button>
          <Link to="/a">Новости</Link>
        </Button>
        <Button>
          <Link>Объявления</Link>
        </Button>
        <Button>
          <Link>Документы</Link>
        </Button>
        <Button>
          <Link>Голосование</Link>
        </Button>
        <Button>
          <Link>Профили</Link>
        </Button>
      </ButtonGroup>
        <Switch>
            <Route/>
        </Switch>
    </>
  );
};

export default AdminContainer;
