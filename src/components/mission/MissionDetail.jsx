import React from "react";
import { Badge, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getMissionById } from "../../services/mission.service";
import AsyncDataComponent from "../shared/AsyncDataComponent";
import MissionInformations from "../../pages/missions/missionInformations/MissionInformations";

export default function MissionDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const asyncMissionDetail = useQuery("missionDetail", () =>
    getMissionById(params.jobId)
  );

  return (
    <Container>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => navigate("", { replace: true })}>
            Détails de la mission
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("other", { replace: true })}>
            Autres informations
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route
          index
          element={<MissionInformations asyncData={asyncMissionDetail} />}
        />
        <Route path="other" element={<div>Test other</div>} />
      </Routes>
    </Container>
  );
}
