import { Button } from "@mui/material";
import React, { useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";

export default function CreateClientForm({ title, show, toggle, onSubmit }) {
  const formFields = [
    {
      label: "Nom",
      name: "firstname",
      type: "text",
    },
    {
      label: "Prenom",
      name: "lastname",
      type: "text",
    },
    {
      label: "Date de naissance",
      name: "ddn",
      type: "date",
    },
  ];

  const defaultFields = {};
  formFields.forEach((field) => (defaultFields[field.name] = ""));
  const [patient, setPatient] = useState(defaultFields);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPatient((old) => ({ ...old, [name]: value }));
  };

  return (
    <Offcanvas
      className="h-auto"
      backdrop="static"
      show={show}
      onHide={toggle}
      placement="bottom"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          {formFields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                name={field.name}
                onChange={handleOnChange}
                value={patient[field.name]}
                type={field.type}
              />
            </Form.Group>
          ))}

          <Button color="primary" onClick={() => onSubmit(patient)}>
            Créer
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
