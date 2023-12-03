import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import JobList from "./jobList/JobList";
import JobListItem from "./jobList/JobListItem";
import { ackJobById, getJobList } from "../../services/job.service";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./job.css";

export default function Jobs() {
  const [showTerminatedJobs, setShowTerminatedJob] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const jobQuery = useQuery("jobList", getJobList);
  const ackMutation = useMutation((jobId) => ackJobById(jobId), {
    onSuccess: () => queryClient.invalidateQueries("jobList"),
  });

  const onJobClick = (jobId) => {
    navigate(`${jobId}/detail`);
  };

  const toggleShowTerminatedJobs = () =>
    setShowTerminatedJob(!showTerminatedJobs);

  const filterTerminatedJobs = (jobs) => {
    return jobs.filter((job) => showTerminatedJobs || !job.isTerminated);
  };

  const isAckLoading = (jobId) => {
    return ackMutation.isLoading && ackMutation.variables == jobId;
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
        data={jobQuery}
        onSuccess={({ data: jobList }) => (
          <JobList
            list={filterTerminatedJobs(jobList)}
            listItem={(job) => (
              <JobListItem
                key={job.jobId}
                job={job}
                onAckJob={ackMutation.mutate}
                isAckLoading={isAckLoading(job.jobId)}
                onClick={onJobClick}
              />
            )}
            emptyListMessage="Pas de missions"
          />
        )}
      />
    </>
  );
}
