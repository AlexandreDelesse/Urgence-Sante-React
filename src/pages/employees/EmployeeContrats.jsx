import React from "react";
import { ListGroup } from "react-bootstrap";
import DateFormatter from "../../components/shared/DateFormatter";

export default function EmployeeContrats({ contrats }) {
  return (
    <ListGroup className="mt-5" variant="flush">
      {contrats.map((contrat) => (
        <ListGroup.Item key={contrat.id}>
          <p className="m-0">
            <span className="fw-bold">Début : </span>
            <DateFormatter isoDate={contrat.from} />
          </p>
          <p>
            <span className="fw-bold">Fin : </span>
            <DateFormatter isoDate={contrat.to} />
          </p>
          <p>Salaire : {contrat.pay}€</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
