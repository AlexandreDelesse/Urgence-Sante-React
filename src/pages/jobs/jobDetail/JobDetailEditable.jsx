import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getJobDetailEditableById } from "../../../services/job.service";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import JobDetailEditableContent from "./JobDetailEditableContent";

export default function JobDetailEditable() {
  const params = useParams();
  const jobDetailEdiableQuery = useQuery(
    ["jobDetailEditable", params.jobId],
    () => getJobDetailEditableById(params.jobId)
  );

  return (
    <div>
      <AsyncDataComponent
        data={jobDetailEdiableQuery}
        onSuccess={({ data: jobDetailEditable }) => (
          <JobDetailEditableContent jobDetailEditable={jobDetailEditable} />
        )}
      />
    </div>
  );
}
