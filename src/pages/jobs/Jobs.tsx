import { useContext, useState } from 'react'
import AsyncDataComponent from '../../components/shared/AsyncDataComponent'
import JobList from './jobList/JobList'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import './job.css'
import DriverSwap from '../../components/shared/driverSwap/DriverSwap'
import packagejson from '../../../package.json'
import { IShortJob } from '../../interfaces/shortJob/IShortJob'
import useGetShortJobList from '../../hooks/query/useGetShortJobList'
import useAckJobMutation from '../../hooks/mutation/useAckJobMutation'
import UserContext from '../../contexts/User.context'
import ShortjobListItem from './jobList/ShortjobListItem'
import { Skeleton } from '@mui/material'

export default function Jobs() {
  const { getToken } = useContext(UserContext)
  const token = getToken()

  const [showTerminatedJobs, setShowTerminatedJob] = useState(false)
  const navigate = useNavigate()

  const shortJobListQuery = useGetShortJobList(token)
  const ackMutation = useAckJobMutation()

  const onJobClick = (jobId: string) => {
    navigate(`${jobId}/detail`)
  }

  const toggleShowTerminatedJobs = () =>
    setShowTerminatedJob(!showTerminatedJobs)

  const filterTerminatedJobs = (shortJobs: IShortJob[]) => {
    return shortJobs.filter(
      (shorJob) => showTerminatedJobs || !shorJob.isTerminated,
    )
  }

  // const isAckLoading = (jobId: string) => {
  //   return ackMutation.isLoading && ackMutation.variables?.jobId === jobId
  // }

  const handleOnAck = (jobId: string) => {
    ackMutation.mutate({ jobId })
  }

  return (
    <>
      <Form.Check
        className="my-2"
        type="switch"
        label="Afficher les missions terminées"
        checked={showTerminatedJobs}
        onChange={toggleShowTerminatedJobs}
      />

      <DriverSwap />

      <AsyncDataComponent
        query={shortJobListQuery}
        onSuccess={({ data: jobList }) => (
          <JobList
            list={filterTerminatedJobs(jobList)}
            listItem={(shortJob: IShortJob) => (
              <ShortjobListItem
                key={shortJob.jobId}
                onAck={handleOnAck}
                onGoDetail={onJobClick}
                shortJob={shortJob}
              />
            )}
            emptyListMessage="Pas de missions"
          />
        )}
      />

      <div>version {packagejson.version}</div>
    </>
  )
}
