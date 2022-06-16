import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { getVehiculeById } from "../../services/vehicule.service";
import { Badge, Card, Dropdown } from "react-bootstrap";
import DateFormatter from "../../components/shared/DateFormatter";
import "./vehiculeDetail.scss";

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
        <Dropdown className="col d-flex justify-content-end p-0 align-items-center me-3">
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
      <div className="mission-history mt-3">
        {missionHistory.length ? (
          missionHistory.map((mission) => (
            <div className="mission-history__wrapper">
              <div className="mission-history__content">
                <h5>
                  <DateFormatter isoDate={mission.date} />
                </h5>
                <p>Départ: {mission.from}</p>
                <p>Arrivé: {mission.to}</p>
              </div>
            </div>
          ))
        ) : (
          <> Pas de mission pour ce vehicule</>
        )}
      </div>
    </div>
  );
};
