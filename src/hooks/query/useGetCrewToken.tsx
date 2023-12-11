import { useQuery } from 'react-query'
import { getCrew } from '../../services/crew.service'

export default function useGetCrewToken(
  id: string,
  employee: string,
  onSuccess: (data: any) => void,
) {
  return useQuery({
    queryKey: ['crewToken', id, employee],
    queryFn: () => getCrew(id, employee),
    onSuccess: (data) => onSuccess(data),
  })
}
