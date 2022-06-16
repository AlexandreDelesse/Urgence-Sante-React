import React, { useEffect, useState } from "react";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";

export default function SearchBar({ onFilterChange }) {
  const [input, setInput] = useState({ type: "", name: "" });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setInput((old) => ({ ...old, [name]: value }));
  };

  const handleOnButtonChange = (value) => {
    setInput((old) => ({ ...old, type: value }));
  };

  useEffect(() => {
    if (!input.type && !input.name) {
      onFilterChange(null);
    } else {
      onFilterChange(input);
    }
  }, [input]);

  const types = ["sang", "ambulance", "vsl"];

  return (
    <Form as="div" className="my-3">
      <h5>Filtres</h5>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              value={input.name}
              name="name"
              onChange={handleOnInputChange}
              placeholder="Entrez un nom ou une immatriculation"
            />
          </Form.Group>
        </Col>

        <Col>
          <ButtonGroup aria-label="Basic example">
            <Button
              onClick={() => handleOnButtonChange("")}
              variant={input.type === "" ? "success" : "primary"}
            >
              All
            </Button>
            {types.map((type) => (
              <Button
                key={type}
                onClick={() => handleOnButtonChange(type)}
                variant={input.type === type ? "success" : "primary"}
              >
                {type}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
}
