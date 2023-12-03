import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const [showPatientForm, setShowPatientForm] = useState(false);

  const jobDetailQuery = useQuery(["jobDetail", params.jobId], () =>
    getJobDetailById(params.jobId)
  );

  const missionStatusQuery = useQuery(["missionStatus", params.jobId], () =>
    getJobStatusById(params.jobId)
  );

  const newPatientMutation = useMutation(createNewPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries("jobDetail");
      toggleShowPatientForm();
    },
  });

  const toggleShowPatientForm = () => setShowPatientForm(!showPatientForm);

  return (
    <>
      <AsyncDataComponent
        data={jobDetailQuery}
        onSuccess={({ data: jobDetail }) => (
          <JobDetailContent
            jobDetail={jobDetail}
            toggleForm={toggleShowPatientForm}
          />
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
      <AsyncDataComponent
        data={jobDetailQuery}
        withoutLoader
        onSuccess={({ data: jobDetail }) => (
          <CreateClientForm
            jobId={params.jobId}
            contactId={jobDetail.contactId}
            title="Nouveau client"
            show={showPatientForm}
            toggle={toggleShowPatientForm}
            onSubmit={newPatientMutation.mutate}
          />
        )}
      />
    </>
  );
}
