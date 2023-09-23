import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  getJobDetailEditableFromJobId,
  getMissionById,
} from "../../services/mission.service";
import AsyncDataComponent from "../shared/AsyncDataComponent";
import MissionInformations from "../../pages/missions/missionInformations/MissionInformations";
import MissionOtherInformations from "../../pages/missions/missionOtherInformations/MissionOtherInformations";

export default function MissionDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [pathSelected, setPathSelected] = useState("details");

  const asyncMissionDetail = useQuery("missionDetail", () =>
    getMissionById(params.jobId)
  );

  const asyncJobDetailEditable = useQuery("jobDetailEdiable", () =>
    getJobDetailEditableFromJobId(params.jobId)
  );

  const onLinkClick = (link) => {
    setPathSelected(link);
    navigate(link, { replace: true });
  };

  return (
    <Container>
      <Nav fill variant="pills" className="my-2">
        <Nav.Item>
          <Nav.Link
            active={pathSelected === "details"}
            onClick={() => onLinkClick("details")}
          >
            Détails
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={pathSelected === "other"}
            onClick={() => onLinkClick("other")}
          >
            Autres
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            active={pathSelected === "signature"}
            onClick={() => onLinkClick("signature")}
          >
            Signature
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route index element={<Navigate to="details" />} />
        <Route
          path="details"
          element={<MissionInformations asyncData={asyncMissionDetail} />}
        />
        <Route
          path="other"
          element={
            <AsyncDataComponent
              withRefetchLoader
              onLoadingMessage="Chargement du détail.."
              data={asyncJobDetailEditable}
              onSuccess={({ data }) => (
                <MissionOtherInformations infosClient={data} />
              )}
            />
          }
        />
      </Routes>
    </Container>
  );
}
