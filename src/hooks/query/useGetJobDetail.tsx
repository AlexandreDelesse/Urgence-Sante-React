import { useQuery } from 'react-query'
import { getJobDetail } from '../../services/jobs.service'

export default function useGetJobDetail(jobId: string) {
  return useQuery(['jobDetail', jobId], () => getJobDetail(jobId))
}
