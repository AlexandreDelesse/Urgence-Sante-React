import React, { useState } from "react";
import { Alert, Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { getCrewByCrewId } from "../services/crew.service";

export default function ManualLogin() {
  const [form, setForm] = useState({ nom: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  };

  const onButtonClick = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      await getCrewByCrewId(`${form.code}&${form.nom}`);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <Container fluid="sm" className="mt-4">
      <h2 className="text-center">Authentification</h2>
      <Col md={{ span: 6, offset: 3 }}>
        {Object.keys(form).map((el) => (
          <Form.Group className="mt-1" key={el}>
            <Form.Label>{el}</Form.Label>
            <Form.Control
              onChange={onChangeForm}
              name={el}
              value={form[el]}
              type="text"
            />
          </Form.Group>
        ))}
        {loading ? (
          <Loader />
        ) : (
          <Button className="mt-3" onClick={onButtonClick}>
            Login
          </Button>
        )}
        {errorMsg && (
          <Alert
            className="mt-3"
            variant="warning"
            dismissible
            onClose={() => setErrorMsg("")}
          >
            <Alert.Heading>
              Il y a eu une erreur, veuillez réessayer
            </Alert.Heading>
            <p>{errorMsg}</p>
          </Alert>
        )}
      </Col>
    </Container>
  );
}
