import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  getJobDetailEditableById,
  patchJobDetailEditable,
} from "../../../services/job.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import JobDetailEditableContent from "./JobDetailEditableContent";
import { Box } from "@mui/system";

export default function JobDetailEditable() {
  const params = useParams();
  const queryClient = useQueryClient();

  const jobDetailEditableQuery = useQuery(
    ["jobDetailEditable", params.jobId],
    () => getJobDetailEditableById(params.jobId)
  );

  const jobDetailEditableMutation = useMutation(patchJobDetailEditable, {
    onSuccess: () =>
      queryClient.invalidateQueries(["jobDetailEditable", params.jobId]),
  });

  return (
    <Box paddingBottom="32px">
      <AsyncDataComponent
        withRefetchLoader
        data={jobDetailEditableQuery}
        onSuccess={({ data: jobDetailEditable }) => (
          <JobDetailEditableContent
            jobDetailEditable={jobDetailEditable}
            onSubmit={jobDetailEditableMutation.mutate}
            isMutating={jobDetailEditableMutation.isLoading}
          />
        )}
      />
    </Box>
  );
}
