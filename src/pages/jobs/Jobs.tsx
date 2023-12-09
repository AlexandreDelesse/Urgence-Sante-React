import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import AsyncDataComponent from '../../components/shared/AsyncDataComponent'
import JobList from './jobList/JobList'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import './job.css'
import DriverSwap from '../../components/shared/driverSwap/DriverSwap'
import packagejson from '../../../package.json'
import { ShortJobService } from '../../services/shortJobService'
import { IShortJob } from '../../interfaces/shortJob/IShortJob'
import JobListItem from './jobList/JobListItem.jsx'
import ShortjobListItem from './jobList/ShortjobListItem'

export default function Jobs() {
  const service = new ShortJobService()
  const [showTerminatedJobs, setShowTerminatedJob] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const jobQuery = useQuery('jobList', service.getAll)
  const ackMutation = useMutation(
    ({ jobId }: { jobId: string }) => service.aknowledge(jobId),
    {
      onSuccess: () => queryClient.invalidateQueries('jobList'),
    },
  )

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

  const isAckLoading = (jobId: string) => {
    return ackMutation.isLoading && ackMutation.variables?.jobId === jobId
  }

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
        data={jobQuery}
        onSuccess={({ data: jobList }) => (
          <JobList
            list={filterTerminatedJobs(jobList)}
            listItem={(shortJob: IShortJob) => (
              // <JobListItem
              //   key={shortJob.jobId}
              //   job={shortJob}
              //   onAckJob={handleOnAck}
              //   isAckLoading={isAckLoading(shortJob.jobId)}
              //   onClick={onJobClick}
              // />
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
