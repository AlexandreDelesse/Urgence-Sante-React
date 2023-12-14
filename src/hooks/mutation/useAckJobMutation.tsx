import { useMutation, useQueryClient } from 'react-query'
import { aknoloedgeJob } from '../../services/jobs.service'

export default function useAckJobMutation(gCrewToken: string | null) {
  const queryClient = useQueryClient()
  return useMutation(({ jobId }: { jobId: string }) => aknoloedgeJob(jobId), {
    onSuccess: () =>
      queryClient.invalidateQueries(['shortJobList', gCrewToken]),
  })
}
