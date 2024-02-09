import React from "react";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import { UseQueryResult } from "react-query";
import { Axios, AxiosResponse } from "axios";
import JobList from "../jobList/JobList";
import ShortjobListItem from "../jobList/ShortjobListItem";
import { IShortJob } from "../../../interfaces/shortJob/IShortJob";

export default function AsyncJobList({
  jobsQuery,
  showTerminatedJobs,
}: {
  jobsQuery: UseQueryResult<AxiosResponse<any, any>>;
  showTerminatedJobs: boolean;
}) {
  const filterTerminatedJobs = (jobs: IShortJob[]) => {
    return jobs.filter(
      (shorJob) => showTerminatedJobs || !shorJob.isTerminated
    );
  };

  return (
    <div>async JobList</div>
    // <AsyncDataComponent
    //   query={jobsQuery}
    //   onSuccess={({ data: jobs }) => (
    //     <JobList
    //       list={filterTerminatedJobs(jobs)}
    //       listItem={(shortJob: IShortJob) => (
    //         <ShortjobListItem isAckLoading={} />
    //       )}
    //     />
    //   )}
    // />
  );
}
