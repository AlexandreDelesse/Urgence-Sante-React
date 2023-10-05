import { Card } from "@mui/material";
import React from "react";

import "./missionListItem.css";
import IconButton from "../../../../components/shared/IconButton";
import { BsCheck2Square } from "react-icons/bs";
import { transportModeEnum } from "../../../../data/enum.data";
import SyncIcon from "@mui/icons-material/Sync";

export default function MissionListItem({
  shortJob,
  onAck,
  isAckLoading,
  onClick,
}) {
  const transportSensEnum = { 1: "Aller", 2: "Retour" };
  return (
    <Card
      onClick={() => onClick(shortJob.jobId)}
      className="d-flex justify-content-between px-0 my-1"
      elevation={2}
    >
      <div className="job-item w-100 ">
        <span className={shortJob.isAck ? "span-success" : "span-warning"} />

        <div className="d-flex flex-column ms-2">
          <div className="d-flex justify-content-between">
            <div className="fw-bold">
              {shortJob.patient}{" "}
              {shortJob.isSerial && (
                <SyncIcon color="warning" fontSize="small" />
              )}
            </div>

            {shortJob.isAck || (
              <IconButton
                size="sm"
                onClick={(e) => onAck(e, shortJob.jobId)}
                variant="success"
                icon={<BsCheck2Square size={16} />}
                isLoading={isAckLoading}
                spinnerVariant="light"
                label="Ok"
              />
            )}
          </div>
          <span>
            {transportModeEnum[shortJob.transportMode]} -{" "}
            {transportSensEnum[shortJob.transportSens]}
          </span>

          <div>
            <div>{shortJob.schedule}</div>
          </div>

          {/* <div>Rdv : {shortJob.appointment || "Pas de rdv"}</div> */}
          <div>
            <span className="fw-bold">Départ :</span>
            {shortJob.departure}
          </div>
          <div>
            <span className="fw-bold">Arrivée :</span>
            {shortJob.arrival}
          </div>
          {/* <div>
            <TransportType transportType={shortJob.transportType} />
          </div> */}
        </div>
      </div>
    </Card>
  );
}
