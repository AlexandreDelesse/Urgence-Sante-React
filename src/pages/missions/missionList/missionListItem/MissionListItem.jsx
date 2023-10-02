import { Paper } from "@mui/material";
import React from "react";

import "./missionListItem.css";
import IconButton from "../../../../components/shared/IconButton";
import { BsCheck2Square } from "react-icons/bs";
import TransportType from "../../../../components/shared/TransportType";
import { transportModeEnum } from "../../../../data/enum.data";

export default function MissionListItem({
  shortJob,
  onAck,
  isAckLoading,
  onClick,
}) {
  return (
    <Paper
      onClick={() => onClick(shortJob.jobId)}
      className="d-flex justify-content-between px-0"
      elevation={2}
    >
      <div className="job-item w-100 ">
        <span className={shortJob.isAck ? "span-success" : "span-warning"} />

        <div className="d-flex flex-column ms-2">
          <div className="d-flex justify-content-between">
            <div>
              <div>{shortJob.schedule}</div>
            </div>
            {shortJob.isAck || (
              <IconButton
                size="sm"
                onClick={(e) => onAck(e, shortJob.jobId)}
                variant="success"
                icon={<BsCheck2Square size={16} />}
                isLoading={isAckLoading}
                spinnerVariant="light"
                label="Bien recus"
              />
            )}
          </div>
          <span>{transportModeEnum[shortJob.transportMode]}</span>
          <div className="fw-bold">{shortJob.patient}</div>
          <div>Rdv : {shortJob.appointment || "Pas de rdv"}</div>
          <div>
            <span className="fw-bold">Départ :</span>
            {shortJob.departure}
          </div>
          <div>
            <span className="fw-bold">Arrivée :</span>
            {shortJob.arrival}
          </div>
          <div>
            <TransportType transportType={shortJob.transportType} />
          </div>
        </div>
      </div>
    </Paper>
  );
}
