import React, { useContext, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { acceptMission, getMissions } from "../../../services/mission.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";

import "../mission.css";
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
    <Col md={{ span: 6, offset: 3 }}>
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
    </Col>
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

  // return (
  //   <ListGroup variant="flush" className="scroll-component mission-list">
  //     {data.map((el, index) => (
  //       <ListGroupItem
  //         key={index}
  //         onClick={() => onMissionClick(el.jobId)}
  //         className="d-flex justify-content-between px-0"
  //       >
  //         <div className="job-item w-100 ">
  //           <span className={el.isAck ? "bg-success" : "bg-warning"} />
  //           <div className="d-flex flex-column ms-2">
  //             <div className="d-flex justify-content-between">
  //               <div>
  //                 <div>{el.schedule}</div>
  //               </div>
  //               {el.isAck || (
  //                 <IconButton
  //                   size="sm"
  //                   onClick={(e) => onButtonClick(e, el.jobId)}
  //                   variant="success"
  //                   icon={<BsCheck2Square size={16} />}
  //                   isLoading={loadingButton === el.jobId}
  //                   spinnerVariant="light"
  //                   label="Bien recus"
  //                 />
  //               )}
  //             </div>
  //             <span>{transportModeEnum[el.transportMode]}</span>
  //             <div className="fw-bold">{el.patient}</div>
  //             <div>Rdv : {el.appointment || "Pas de rdv"}</div>
  //             <div>
  //               <span className="fw-bold">Départ :</span>
  //               {el.departure}
  //             </div>
  //             <div>
  //               <span className="fw-bold">Arrivée :</span>
  //               {el.arrival}
  //             </div>
  //             <div>
  //               <TransportType transportType={el.transportType} />
  //             </div>
  //           </div>
  //         </div>
  //       </ListGroupItem>
  //     ))}
  //   </ListGroup>
  // );
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
