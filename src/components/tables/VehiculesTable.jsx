import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function VehiculesTable({ vehicules }) {
  const navigate = useNavigate();

  const handleOnRowClick = ({ id }) => {
    navigate(`${id}/detail`);
  };

  return (
    <Table striped hover className="my-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Immatriculation</th>
          <th>Type</th>
          <th>Km</th>
        </tr>
      </thead>
      <tbody>
        {vehicules.map((vehicule) => (
          <tr onClick={() => handleOnRowClick(vehicule)} key={vehicule.id}>
            <td>{vehicule.id}</td>
            <td>{vehicule.name}</td>
            <td>{vehicule.immat}</td>
            <td>{vehicule.type}</td>
            <td>{vehicule.km}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
