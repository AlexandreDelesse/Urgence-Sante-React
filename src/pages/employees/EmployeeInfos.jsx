import React from "react";
import { Container } from "react-bootstrap";

export default function EmployeeInfos({ employee }) {
  return (
    <Container className="mt-5">
      <h2>{employee.name}</h2>
      <p>Numero de secu : {employee.secu}</p>

      <p>Société : {employee.company}</p>
    </Container>
  );
}
