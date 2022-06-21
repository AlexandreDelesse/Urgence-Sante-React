import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./vehiculeCardList.scss";

export default function VehiculeCardList({ vehicules }) {
  const navigate = useNavigate();

  const handleOnVehiculeClick = ({ id }) => {
    navigate(`${id}/detail`);
  };

  return (
    <div className="vehicule-card-list my-5">
      {vehicules.map((vehicule) => (
        <VehiculeCard
          onClick={handleOnVehiculeClick}
          vehicule={vehicule}
          key={vehicule.id}
        />
      ))}
    </div>
  );
}

const VehiculeCard = ({ vehicule, onClick }) => {
  return (
    <Card onClick={() => onClick(vehicule)}>
      <Card.Header>
        <Card.Title>{vehicule.immat}</Card.Title>
        {vehicule.type}
      </Card.Header>
      <Card.Body>
        <Card.Title>{vehicule.name}</Card.Title>
        <Card.Text>Km : {vehicule.km}</Card.Text>
      </Card.Body>
    </Card>
  );
};
