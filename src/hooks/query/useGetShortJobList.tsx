import { useQuery } from 'react-query'
import { getShortJobList } from '../../services/jobs.service'

export default function useGetShortJobList(gCrewToken: string) {
  return useQuery(['shortJobList', gCrewToken], () =>
    getShortJobList(gCrewToken),
  )
}
