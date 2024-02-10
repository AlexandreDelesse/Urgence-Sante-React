import { useMutation, useQueryClient } from "react-query";
import { aknoloedgeJob } from "../../services/jobs.service";
import { useContext } from "react";
import FilterContext from "../../contexts/Filter.context";

export default function useAckJobMutation() {
  const queryClient = useQueryClient();
  const { showPastMission } = useContext(FilterContext);

  return useMutation(({ jobId }: { jobId: string }) => aknoloedgeJob(jobId), {
    onSuccess: () =>
      queryClient.invalidateQueries(["shortJobList", showPastMission]),
  });
}
