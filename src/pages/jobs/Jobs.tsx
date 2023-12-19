import { useContext } from 'react'
import AsyncDataComponent from '../../components/shared/AsyncDataComponent'
import JobList from './jobList/JobList'
import { useNavigate } from 'react-router-dom'
import './job.css'
import { IShortJob } from '../../interfaces/shortJob/IShortJob'
import useGetShortJobList from '../../hooks/query/useGetShortJobList'
import useAckJobMutation from '../../hooks/mutation/useAckJobMutation'
import UserContext from '../../contexts/User.context'
import ShortjobListItem from './jobList/ShortjobListItem'
import SwitchButton from '../../components/shared/switchButton/SwitchButton'
import FilterContext from '../../contexts/Filter.context'
import { Box } from '@mui/system'
import DriverSwapWidget from '../../components/shared/driverSwap/DriverSwapWidget'
import { Skeleton } from '@mui/material'

export default function Jobs() {
  const { showPastMission, setShowPastMission } = useContext(FilterContext)

  const { getToken } = useContext(UserContext)
  const navigate = useNavigate()

  const token = getToken()

  const shortJobListQuery = useGetShortJobList(token)
  const ackMutation = useAckJobMutation(token)

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

  const onLoading = () => (
    <Box
      sx={{ display: 'flex', gap: 1, flexDirection: 'column', marginTop: 1 }}
    >
      {[1, 2, 3].map((el) => (
        <Skeleton key={el} variant="rectangular" width="100%" height={60} />
      ))}
    </Box>
  )

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        <SwitchButton
          selected={showPastMission}
          onChange={toggleShowTerminatedJobs}
        />

        <DriverSwapWidget />
      </Box>

      <AsyncDataComponent
        query={shortJobListQuery}
        onSuccess={({ data: jobList }) => (
          <JobList
            list={filterTerminatedJobs(jobList)}
            listItem={(shortJob: IShortJob) => (
              <ShortjobListItem
                isAckLoading={
                  shortJob.jobId === ackMutation.variables?.jobId &&
                  ackMutation.isLoading
                }
                key={shortJob.jobId}
                onAck={handleOnAck}
                onGoDetail={onJobClick}
                shortJob={shortJob}
              />
            )}
            emptyListMessage="Pas de missions"
          />
        )}
        onLoading={onLoading}
      />
    </>
  )
}
