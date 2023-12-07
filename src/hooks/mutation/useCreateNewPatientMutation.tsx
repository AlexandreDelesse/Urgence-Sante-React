import { useMutation, useQueryClient } from 'react-query'
import { createNewPatient } from '../../services/patient.service'

export default function useCreateNewPatientMutation({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const queryClient = useQueryClient()
  return useMutation(createNewPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('jobDetail')
      onSuccess()
    },
  })
}
