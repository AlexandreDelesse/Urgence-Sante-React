import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getJobDetailById,
  getJobStatusById,
} from "../../../services/job.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import JobDetailContent from "./JobDetailContent";
import StepProgress from "../../missions/missionDetails/missionInformations/stepProgress/StepProgress";
import { createNewPatient } from "../../../services/patient.service";
import CreateClientForm from "../../missions/missionDetails/missionInformations/createClientForm/CreateClientForm";

export default function JobDetail() {
  const params = useParams();
  const [showPatientForm, setShowPatientForm] = useState(true);

  const jobDetailQuery = useQuery(["jobDetail", params.jobId], () =>
    getJobDetailById(params.jobId)
  );

  const missionStatusQuery = useQuery(["missionStatus", params.jobId], () =>
    getJobStatusById(params.jobId)
  );

  const newPatientMutation = useMutation(createNewPatient);

  const toggleShowPatientForm = () => setShowPatientForm(!showPatientForm);

  return (
    <>
      <AsyncDataComponent
        data={jobDetailQuery}
        onSuccess={({ data: jobDetail }) => (
          <JobDetailContent jobDetail={jobDetail} />
        )}
      />

      <AsyncDataComponent
        data={missionStatusQuery}
        onSuccess={({ data: jobStatus }) => (
          <StepProgress
            jobId={params.jobId}
            initialStep={{
              go: jobStatus.go ? new Date(jobStatus.go) : null,
              onSite: jobStatus.onSite ? new Date(jobStatus.onSite) : null,
              available: jobStatus.available
                ? new Date(jobStatus.available)
                : null,
            }}
          />
        )}
      />

      <CreateClientForm
        show={showPatientForm}
        toggle={toggleShowPatientForm}
        onSubmit={newPatientMutation.mutate}
      />
    </>
  );
}
