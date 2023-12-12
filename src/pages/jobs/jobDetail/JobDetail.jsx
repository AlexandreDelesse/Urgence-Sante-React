import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AsyncDataComponent from '../../../components/shared/AsyncDataComponent'
import JobDetailContent from './JobDetailContent'
import CreateClientForm from '../../missions/missionDetails/missionInformations/createClientForm/CreateClientForm'
import useGetJobDetail from '../../../hooks/query/useGetJobDetail'
import useGetMissionStatus from '../../../hooks/query/useGetMissionStatus'
import StepProgressDecorator from '../../missions/missionDetails/missionInformations/stepProgress/StepProgressDecorator'
import useCreateNewPatientMutation from '../../../hooks/mutation/useCreateNewPatientMutation'
import BackButton from '../../../components/shared/BackButton'

export default function JobDetail() {
  const params = useParams()

  const [showPatientForm, setShowPatientForm] = useState(false)

  const jobDetailQuery = useGetJobDetail(params.jobId)
  const missionStatusQuery = useGetMissionStatus(params.jobId)

  const toggleShowPatientForm = () => setShowPatientForm(!showPatientForm)

  const newPatientMutation = useCreateNewPatientMutation({
    onSuccess: toggleShowPatientForm,
  })

  return (
    <>
      <AsyncDataComponent
        query={jobDetailQuery}
        onSuccess={({ data: jobDetail }) => (
          <JobDetailContent
            jobDetail={jobDetail}
            toggleForm={toggleShowPatientForm}
          />
        )}
      />

      <AsyncDataComponent
        query={missionStatusQuery}
        onSuccess={({ data: jobStatus }) => (
          <StepProgressDecorator jobId={params.jobId} initialStep={jobStatus} />
        )}
      />
      <AsyncDataComponent
        query={jobDetailQuery}
        withoutLoader
        onSuccess={({ data: jobDetail }) => (
          <CreateClientForm
            jobId={params.jobId}
            contactId={jobDetail.contactId}
            title="Nouveau client"
            show={showPatientForm}
            toggle={toggleShowPatientForm}
            onSubmit={newPatientMutation.mutate}
          />
        )}
      />
    </>
  )
}
