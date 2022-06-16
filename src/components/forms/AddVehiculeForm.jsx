import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddVehiculeForm() {
  const [input, setInput] = useState({ name: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const types = ["vsl", "ambulance", "sang"];

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setInput((old) => ({ ...old, [name]: value }));
  };

  return (
    <Form as="div" className="col-sm-8 col-md-5 mt-5 m-auto">
      <Form.Group className="my-3">
        <Form.Label>Nom du vehicule</Form.Label>
        <Form.Control
          value={input.name}
          name="name"
          onChange={handleOnInputChange}
          type="text"
          placeholder="Entrez un nom"
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Form.Label>Type de vehicule</Form.Label>
        <Form.Select
          value={input.type}
          name="type"
          onChange={handleOnInputChange}
          type="text"
        >
          <option>Select type</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="my-3">
        <Form.Label>Immatriculation</Form.Label>
        <Form.Control
          value={input.immat}
          name="immat"
          onChange={handleOnInputChange}
          type="text"
          placeholder="Entrez l'immatriculation"
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Form.Label>Nombre de Km</Form.Label>
        <Form.Control
          value={input.km}
          name="km"
          onChange={handleOnInputChange}
          type="number"
          placeholder="Entrez le nombre de Km"
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
      <Button type="button" onChange={() => {}} className="mt-2">
        Ajouter
      </Button>
      <Button
        type="button"
        variant="outline-danger"
        onClick={() => navigate(-1)}
        className="mt-2 ms-3"
      >
        Annuler
      </Button>
    </Form>
  );
}
