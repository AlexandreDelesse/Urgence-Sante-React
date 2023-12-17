<<<<<<< HEAD
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

=======
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import JobList from "./jobList/JobList";
import JobListItem from "./jobList/JobListItem";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./job.css";
import packagejson from "../../../package.json";
import { ShortJobService } from "../../services/shortJobService";
import { IShortJob } from "../../interfaces/shortJob/IShortJob";
import DriverSwapFacade from "../../components/shared/driverSwap/DriverSwapFacade";
import { WebDriverGetService } from "../../services/WebDriverService";
import { IDriverGet } from "../../interfaces/IDriverGet";

export default function Jobs() {
  const crewId = 200400;

  const service = new ShortJobService();
  const driverService = new WebDriverGetService();
  const [showTerminatedJobs, setShowTerminatedJob] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const jobQuery = useQuery("jobList", service.getAll);
  const driverQuery = useQuery(["driver", crewId], () =>
    driverService.getAll(crewId)
  );

  const ackMutation = useMutation(
    ({ jobId }: { jobId: string }) => service.aknowledge(jobId),
    {
      onSuccess: () => queryClient.invalidateQueries("jobList"),
    }
  );

>>>>>>> DriverSwap
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

      <AsyncDataComponent
        data={driverQuery}
        onSuccess={({ data: driverModel }: { data: IDriverGet }) => (
          <DriverSwapFacade drivers={driverModel.drivers} />
        )}
      />

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
