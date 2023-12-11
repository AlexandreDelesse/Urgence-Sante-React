import { useQuery } from 'react-query'
import { getJobDetailEditable } from '../../services/jobs.service'

export default function useGetJobDetailEditable(jobId: string) {
  return useQuery(['jobDetailEditable', jobId], () =>
    getJobDetailEditable(jobId),
  )
}
