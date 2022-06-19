import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EmployeesTable({ employees }) {
  const navigate = useNavigate();

  const handleOnRowClick = ({ id }) => {
    navigate(`${id}/detail`);
  };

  return (
    <Table striped hover className="my-3" size="sm" responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>n° secu</th>
          <th>Société</th>
          <th>Contrats</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr onClick={() => handleOnRowClick(employee)} key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.secu}</td>
            <td>{employee.company}</td>
            <td>{employee.contrats.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
