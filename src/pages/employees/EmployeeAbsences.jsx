import React from "react";
import { ListGroup } from "react-bootstrap";
import DateFormatter from "../../components/shared/DateFormatter";
import "./employee.scss";

export default function EmployeeAbsences({ absences }) {
  return (
    <ListGroup className="mt-5 employee-absence-listgroup" variant="flush">
      {absences.map((absence) => (
        <ListGroup.Item
          key={absence.id}
          className="employee-absence-listgroup__item"
        >
          <span className={absence.isJustified ? "bg-success" : "bg-warning"} />
          <div className="ps-2">
            <p className="m-0">
              <span className="fw-bold">Début : </span>
              <DateFormatter isoDate={absence.from} />
            </p>
            <p>
              <span className="fw-bold">Fin : </span>
              <DateFormatter isoDate={absence.to} />
            </p>
            <p className="mb-0">Cause : {absence.cause}</p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
