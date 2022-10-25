import { useQuery } from 'react-query'
import { getVehicules } from '../../services/vehicule.service'

export default function useGetVehicules() {
  const vehicules = useQuery('vehicules', getVehicules)

  return vehicules
}
