import { useQuery } from 'react-query'
import { getDriver } from '../../services/driver.service'

export default function useGetDriver(crewId: number | null) {
  return useQuery(['driver', crewId], () => getDriver(crewId))
}
