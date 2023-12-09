import { useQuery } from 'react-query'
import { getCrew } from '../../services/crew.service'

export default function useGetCrewToken(crewString: string) {
  const [crewId, employeeName] = crewString.split('&')
  console.log(crewString, crewId, employeeName)
  return useQuery({
    queryKey: ['crewToken', crewId, employeeName],
    queryFn: () => getCrew(crewId, employeeName),
  })
}
