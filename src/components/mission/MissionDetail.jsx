import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useQuery } from "react-query";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getMissionById } from "../../services/mission.service";
import AsyncDataComponent from "../shared/AsyncDataComponent";
import MissionInformations from "../../pages/missions/missionInformations/MissionInformations";
import MissionOtherInformations from "../../pages/missions/missionOtherInformations/MissionOtherInformations";

export default function MissionDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [pathSelected, setPathSelected] = useState("");

  const asyncMissionDetail = useQuery("missionDetail", () =>
    getMissionById(params.jobId)
  );

  const onLinkClick = (link) => {
    setPathSelected(link);
    navigate(link, { replace: true });
  };

  return (
    <Container>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={pathSelected === ""}
            onClick={() => onLinkClick("")}
          >
            Détails de la mission
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={pathSelected === "other"}
            onClick={() => onLinkClick("other")}
          >
            Autres informations
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route
          index
          element={<MissionInformations asyncData={asyncMissionDetail} />}
        />
        <Route
          path="other"
          element={
            <AsyncDataComponent
              withRefetchLoader
              onLoadingMessage="Chargement du détail.."
              data={asyncMissionDetail}
              onSuccess={({ data }) => (
                <MissionOtherInformations infosClient={data.infosClient} />
              )}
            />
          }
        />
      </Routes>
    </Container>
  );
}
