import React, { useContext, useState } from "react";
import UserContext from "../../../contexts/User.context";
import { Button, Form } from "react-bootstrap";

export default function CrewListLogin() {
  const [value, setValue] = useState("");
  const userContext = useContext(UserContext);
  
  const password = `regul-${Math.trunc(
    new Date().getFullYear() / (new Date().getMonth() + 1)
  ).toString()}`;

  const onLogin = () => {
    if (value != password) return;
    else userContext.setHasLogged(true);
  };

  return (
    <Form className="col-sm-6 offset-sm-3 mt-5">
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Group>
      <Button onClick={onLogin} variant="success" className="mt-2">
        Valider
      </Button>
    </Form>
  );
}
