import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Badge, Dropdown } from "react-bootstrap";
import useGetVehiculeById from "../../hooks/getter/useGetVehiculeById";
import DateFormatter from "../../components/shared/DateFormatter";
import "./vehiculeDetail.scss";
import { deleteVehiculeById } from "../../services/vehicule.service";

export default function VehiculeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicule = useGetVehiculeById(id);
  console.log(Object.keys(vehicule).length);

  if (!vehicule) return <Navigate to="/404" />;
  if (Object.keys(vehicule).length === 0) return <>Coucou</>;

  const handleOnDeleteClick = async () => {
    try {
      await deleteVehiculeById(vehicule.id);
      navigate(-1);
    } catch (error) {}
  };

  return (
    <div>
      <div className="row mt-3">
        <h2 className="col">
          {vehicule.name.toUpperCase()} <Badge>{vehicule.immat}</Badge>{" "}
        </h2>
        <Dropdown className="col d-flex justify-content-end p-0 align-items-center me-3">
          <Dropdown.Toggle variant="secondary">Actions</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOnDeleteClick}>
              Supprimer
            </Dropdown.Item>
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
      {missionHistory ? (
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
      ) : (
        <>Pas d'historique de mission pour ce vehicule</>
      )}
    </div>
  );
};
