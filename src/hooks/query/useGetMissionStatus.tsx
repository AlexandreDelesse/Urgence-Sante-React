import { useQuery } from 'react-query'
import { getMissionStatus } from '../../services/jobs.service'

export default function useGetMissionStatus(jobId: string) {
  return useQuery(['missionStatus', jobId], () => getMissionStatus(jobId))
}
