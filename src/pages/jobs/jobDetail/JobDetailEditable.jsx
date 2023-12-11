import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { patchJobDetailEditable } from '../../../services/job.service'
import AsyncDataComponent from '../../../components/shared/AsyncDataComponent'
import JobDetailEditableContent from './JobDetailEditableContent'
import { Box } from '@mui/system'
import useGetJobDetailEditable from '../../../hooks/query/useGetJobDetailEditable'

//TODO: Continuer a refactor les useQuery et useMutation

export default function JobDetailEditable() {
  const params = useParams()
  const queryClient = useQueryClient()

  const jobDetailEditableQuery = useGetJobDetailEditable(params.jobId)

  //TODO: refacto usemutation
  const jobDetailEditableMutation = useMutation(patchJobDetailEditable, {
    onSuccess: () =>
      queryClient.invalidateQueries(['jobDetailEditable', params.jobId]),
  })

  return (
    <Box paddingBottom="32px">
      <AsyncDataComponent
        withRefetchLoader
        query={jobDetailEditableQuery}
        onSuccess={({ data: jobDetailEditable }) => (
          <JobDetailEditableContent
            jobDetailEditable={jobDetailEditable}
            onSubmit={jobDetailEditableMutation.mutate}
            isMutating={jobDetailEditableMutation.isLoading}
          />
        )}
      />
    </Box>
  )
}
