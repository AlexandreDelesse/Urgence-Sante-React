import { Card } from "react-bootstrap";
import SyncIcon from "@mui/icons-material/Sync";
import { BsCheck2Square } from "react-icons/bs";

import IconButton from "../../../components/shared/IconButton";
import TransportMode from "../../missions/missionList/missionListItem/transportMode/TransportMode";
import TransportSens from "../../missions/missionList/missionListItem/transportSens/TransportSens";

export default function JobListItem({ job, onAckJob, onClick, isAckLoading }) {
  const onAck = (e, jobId) => {
    e.stopPropagation();
    onAckJob(jobId);
  };

  return (
    <Card
      elevation={0}
      onClick={() => onClick(job.jobId)}
      className="d-flex justify-content-between px-0 my-2"
    >
      <div className="job-item w-100 ">
        <span className={job.isAck ? "span-success" : "span-warning"} />

        <div className="d-flex flex-column ms-2">
          <div className="d-flex justify-content-between">
            <div className="fw-bold">
              {job.patient}{" "}
              {job.isSerial && <SyncIcon color="warning" fontSize="small" />}
            </div>

            {job.isAck || (
              <IconButton
                size="sm"
                onClick={(e) => onAck(e, job.jobId)}
                variant="success"
                icon={<BsCheck2Square size={16} />}
                isLoading={isAckLoading}
                spinnerVariant="light"
                label="Ok"
              />
            )}
          </div>

          <span>
            <TransportMode mode={job.transportMode} /> -{" "}
            <TransportSens sens={job.transportSens} />
          </span>

          <div>
            <div>{job.schedule}</div>
          </div>

          {/* <div>Rdv : {shortJob.appointment || "Pas de rdv"}</div> */}
          <div>
            <span className="fw-bold">Départ :</span>
            {job.departure}
          </div>
          <div>
            <span className="fw-bold">Arrivée :</span>
            {job.arrival}
          </div>
          {/* <div>
          <TransportType type={shortJob.transportType} />
        </div> */}
        </div>
      </div>
    </Card>
  );
}
