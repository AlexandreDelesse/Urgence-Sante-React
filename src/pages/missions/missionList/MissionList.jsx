import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { acceptMission, getMissions } from "../../../services/mission.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";

import MissionListItem from "./missionListItem/MissionListItem";
import FilterContext from "../../../contexts/Filter.context";

export default function MissionList() {
  const navigate = useNavigate();
  const { showPastMission, setShowPastMission } = useContext(FilterContext);
  const [loadingButton, setLoadingButton] = useState("");

  const asyncMissions = useQuery("missions", getMissions);
  const queryClient = useQueryClient();

  const onMissionClick = (missionIndex) => {
    navigate(`jobdetail/${missionIndex}`);
  };

  const onButtonClick = async (e, jobId) => {
    e.stopPropagation();
    setLoadingButton(jobId);
    await acceptMission(jobId);
    setLoadingButton("");
    queryClient.invalidateQueries("missions");
  };

  const toggleShowPastMission = () => {
    setShowPastMission((old) => !old);
  };

  return (
    <>
      <Form.Check
        className="my-2"
        type="switch"
        label="Afficher les missions terminées"
        checked={showPastMission}
        onChange={toggleShowPastMission}
      />
      <AsyncDataComponent
        data={asyncMissions}
        onLoadingMessage="Chargement des missions.."
        onSuccess={({ data }) => (
          <ListeMission
            onMissionClick={onMissionClick}
            onButtonClick={onButtonClick}
            data={data
              .filter((el) => showPastMission || !el.isTerminated)
              .sort((a, b) => b.index - a.index)}
            loadingButton={loadingButton}
          />
        )}
      ></AsyncDataComponent>
    </>
  );
}

const ListeMission = ({
  data,
  onMissionClick,
  onButtonClick,
  loadingButton,
}) => {
  if (data.length === 0)
    return <div className="text-center mt-3">Pas de missions en cours</div>;

  return (
    <div className="scroll-component mission-list">
      {data.map((shortJob, index) => (
        <MissionListItem
          key={index}
          shortJob={shortJob}
          onClick={onMissionClick}
          onAck={onButtonClick}
          isAckLoading={loadingButton === shortJob.jobId}
        />
      ))}
    </div>
  );
};
