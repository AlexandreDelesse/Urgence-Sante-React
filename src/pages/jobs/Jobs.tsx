import { useContext } from 'react'
import AsyncDataComponent from '../../components/shared/AsyncDataComponent'
import JobList from './jobList/JobList'
import { useNavigate } from 'react-router-dom'
import './job.css'
import DriverSwap from '../../components/shared/driverSwap/DriverSwap'
import { IShortJob } from '../../interfaces/shortJob/IShortJob'
import useGetShortJobList from '../../hooks/query/useGetShortJobList'
import useAckJobMutation from '../../hooks/mutation/useAckJobMutation'
import UserContext from '../../contexts/User.context'
import ShortjobListItem from './jobList/ShortjobListItem'
import SwitchButton from '../../components/shared/switchButton/SwitchButton'
import FilterContext from '../../contexts/Filter.context'

export default function Jobs() {
  const { showPastMission, setShowPastMission } = useContext(FilterContext)

  const { getToken } = useContext(UserContext)
  const navigate = useNavigate()

  const token = getToken()

  const shortJobListQuery = useGetShortJobList(token)
  const ackMutation = useAckJobMutation()

  const onJobClick = (jobId: string) => {
    navigate(`${jobId}/detail`)
  }

  const toggleShowTerminatedJobs = () => setShowPastMission(!showPastMission)

  const filterTerminatedJobs = (shortJobs: IShortJob[]) => {
    return shortJobs.filter(
      (shorJob) => showPastMission || !shorJob.isTerminated,
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
      <SwitchButton
        selected={showPastMission}
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
    </>
  )
}
