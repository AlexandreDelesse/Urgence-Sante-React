import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  getJobDetailEditableFromJobId,
  getMissionById,
  getMissionStatus,
} from "../../../services/mission.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import MissionInformations from "./missionInformations/MissionInformations";
import MissionOtherInformations from "./missionOtherInformations/MissionOtherInformations";
import BottomNav from "./bottomNav/BottomNav";

export default function MissionDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [pathSelected, setPathSelected] = useState("");

  const asyncMissionDetail = useQuery("missionDetail", () =>
    getMissionById(params.jobId)
  );

  const asyncJobDetailEditable = useQuery("jobDetailEdiable", () =>
    getJobDetailEditableFromJobId(params.jobId)
  );

  const missionStatusQuery = useQuery("missionStatus", () =>
    getMissionStatus(params.jobId)
  );

  const onLinkClick = (link) => {
    setPathSelected(link);
    navigate(link, { replace: true });
  };

  if (!params.jobId) return <div>Il y a une erreur dans l'url</div>;

  return (
    <>
      <BottomNav activelink={pathSelected} onLinkClick={onLinkClick} />

      <Routes>
        <Route
          index
          element={
            <MissionInformations
              asyncData={asyncMissionDetail}
              jobId={params.jobId}
              asyncMissionStatus={missionStatusQuery}
            />
          }
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
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </>
  );
}