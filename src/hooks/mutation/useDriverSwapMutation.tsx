import { useMutation, useQueryClient } from 'react-query'
import { swapDriver } from '../../services/driver.service'

export default function useDriverSwapMutation(crewId: number | null) {
  const queryClient = useQueryClient()
  return useMutation(
    ({ driverId, vehicleId }: { driverId: number; vehicleId: number }) =>
      swapDriver(driverId, vehicleId),
    {
      onSuccess: () => queryClient.invalidateQueries(['driver', crewId]),
    },
  )
}
