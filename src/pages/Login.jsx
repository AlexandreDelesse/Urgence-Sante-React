import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/User.context";
import { login } from "../services/user.service";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [input, setInput] = useState({ name: "" });
  const [error, setError] = useState(null);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setInput((old) => ({ ...old, [name]: value }));
  };

  const handleOnLogin = () => {
    if (!input.name) return;
    try {
      const user = login(input);
      if (!user) return;
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // form as div to prevent trigger form on pressing 'enter' key
    <Form as="div" className="col-md-6 mt-5 m-auto p-3 border rounded">
      <Form.Group>
        <Form.Label>Identifiant</Form.Label>
        <Form.Control
          value={input.name}
          name="name"
          onChange={handleOnInputChange}
          type="text"
          placeholder="Entrez votre identifiant"
        />
      </Form.Group>
      {error && (
        <Alert
          variant="warning"
          onClose={() => setError(null)}
          dismissible
          className="mt-3"
        >
          {error}
        </Alert>
      )}
      <Button type="button" onClick={handleOnLogin} className="mt-2">
        Login
      </Button>
    </Form>
  );
}
