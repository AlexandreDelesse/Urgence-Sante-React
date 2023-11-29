import { Button } from "@mui/material";
import React from "react";
import { Form, Offcanvas } from "react-bootstrap";

export default function CreateClientForm({ show, toggle }) {
  return (
    <Offcanvas
      className="h-auto"
      backdrop="static"
      show={show}
      onHide={toggle}
      placement="bottom"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Nouveau client</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Dupont" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prenom</Form.Label>
            <Form.Control type="text" placeholder="Jean" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Button onClick={toggle} >Créer</Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
