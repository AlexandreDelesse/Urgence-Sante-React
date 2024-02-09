import { useMutation, useQueryClient } from "react-query";
import { aknoloedgeJob } from "../../services/jobs.service";
import { useContext } from "react";
import UserContext from "../../contexts/User.context";

export default function useAckJobMutation(userToken?: string | null) {
  const queryClient = useQueryClient();
  const { getToken } = useContext(UserContext);
  const gCrewToken = getToken();

  return useMutation(({ jobId }: { jobId: string }) => aknoloedgeJob(jobId), {
    onSuccess: () => queryClient.invalidateQueries("shortJobList"),
  });
}
