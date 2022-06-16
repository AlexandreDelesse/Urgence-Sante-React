import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { getVehiculeById } from "../../services/vehicule.service";
import { Badge, Card, Dropdown } from "react-bootstrap";
import DateFormatter from "../../components/shared/DateFormatter";

export default function VehiculeDetail() {
  const { id } = useParams();

  const vehicule = getVehiculeById(id);
  console.log(vehicule);

  if (!vehicule) return <Navigate to="/404" />;

  return (
    <div>
      <div className="row mt-3">
        <h2 className="col">
          {vehicule.name.toUpperCase()} <Badge>{vehicule.immat}</Badge>{" "}
        </h2>
        <Dropdown className="col d-flex justify-content-end p-0 align-items-center ">
          <Dropdown.Toggle variant="secondary">Actions</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Supprimer</Dropdown.Item>
            <Dropdown.Item>Modifier</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <MissionHistory missionHistory={vehicule.missionHistory} />
    </div>
  );
}

const MissionHistory = ({ missionHistory }) => {
  return (
    <div className="mt-5">
      <h4>Historique de missions</h4>
      <div className="d-flex mt-3">
        {missionHistory.length ? (
          missionHistory.map((mission) => (
            <Card className="me-4 col-4">
              <Card.Header>
                <Card.Title className="text-capitalize">
                  <DateFormatter isoDate={mission.date} />
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Départ : {mission.from}</Card.Text>
                <Card.Text>Arrivé : {mission.to}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <> Pas de mission pour ce vehicule</>
        )}
      </div>
    </div>
  );
};
