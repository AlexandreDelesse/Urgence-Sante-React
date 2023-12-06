import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import JobList from "./jobList/JobList";
import JobListItem from "./jobList/JobListItem";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./job.css";
import packagejson from "../../../package.json";
import { ShortJobService } from "../../services/shortJobService";
import { IShortJob } from "../../interfaces/shortJob/IShortJob";
import DriverSwapFacade from "../../components/shared/driverSwap/DriverSwapFacade";
import { WebDriverGetService } from "../../services/WebDriverService";
import { IDriverGet } from "../../interfaces/IDriverGet";

export default function Jobs() {
  const crewId = 200400;

  const service = new ShortJobService();
  const driverService = new WebDriverGetService();
  const [showTerminatedJobs, setShowTerminatedJob] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const jobQuery = useQuery("jobList", service.getAll);
  const driverQuery = useQuery(["driver", crewId], () =>
    driverService.getAll(crewId)
  );

  const ackMutation = useMutation(
    ({ jobId }: { jobId: string }) => service.aknowledge(jobId),
    {
      onSuccess: () => queryClient.invalidateQueries("jobList"),
    }
  );

  const onJobClick = (jobId: string) => {
    navigate(`${jobId}/detail`);
  };

  const toggleShowTerminatedJobs = () =>
    setShowTerminatedJob(!showTerminatedJobs);

  const filterTerminatedJobs = (shortJobs: IShortJob[]) => {
    return shortJobs.filter(
      (shorJob) => showTerminatedJobs || !shorJob.isTerminated
    );
  };

  const isAckLoading = (jobId: string) => {
    return ackMutation.isLoading && ackMutation.variables?.jobId === jobId;
  };

  const handleOnAck = (jobId: string) => {
    ackMutation.mutate({ jobId });
  };

  return (
    <>
      <Form.Check
        className="my-2"
        type="switch"
        label="Afficher les missions terminées"
        checked={showTerminatedJobs}
        onChange={toggleShowTerminatedJobs}
      />

      <AsyncDataComponent
        data={driverQuery}
        onSuccess={({ data: driverModel }: { data: IDriverGet }) => (
          <DriverSwapFacade drivers={driverModel.drivers} />
        )}
      />

      <AsyncDataComponent
        data={jobQuery}
        onSuccess={({ data: jobList }) => (
          <JobList
            list={filterTerminatedJobs(jobList)}
            listItem={(shortJob: IShortJob) => (
              <JobListItem
                key={shortJob.jobId}
                job={shortJob}
                onAckJob={handleOnAck}
                isAckLoading={isAckLoading(shortJob.jobId)}
                onClick={onJobClick}
              />
            )}
            emptyListMessage="Pas de missions"
          />
        )}
      />

      <div>version {packagejson.version}</div>
    </>
  );
}
