import { useContext } from "react";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import JobList from "./jobList/JobList";
import { useNavigate } from "react-router-dom";
import "./job.css";
import { IShortJob } from "../../interfaces/shortJob/IShortJob";
import useGetShortJobList from "../../hooks/query/useGetShortJobList";
import ShortjobListItem from "./jobList/ShortjobListItem";
import SwitchButton from "../../components/shared/switchButton/SwitchButton";
import FilterContext from "../../contexts/Filter.context";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";
import DriverSwapView from "../../components/shared/driverSwap/views/DriverSwapView";

export default function Jobs() {
  const { showPastMission, setShowPastMission } = useContext(FilterContext);
  const navigate = useNavigate();

  const shortJobListQuery = useGetShortJobList();

  const onJobClick = (jobId: string) => {
    navigate(`${jobId}/detail`);
  };

  const toggleShowTerminatedJobs = () => setShowPastMission(!showPastMission);

  const onLoading = () => (
    <Box
      sx={{ display: "flex", gap: 1, flexDirection: "column", marginTop: 1 }}
    >
      {[1, 2, 3].map((el) => (
        <Skeleton key={el} variant="rectangular" width="100%" height={60} />
      ))}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
        <SwitchButton
          selected={showPastMission}
          onChange={toggleShowTerminatedJobs}
        />
        {/* <DriverSwapWidget /> */}
        <DriverSwapView />
      </Box>

      <AsyncDataComponent
        query={shortJobListQuery}
        onSuccess={(jobList) => (
          <JobList
            list={jobList}
            listItem={(shortJob: IShortJob) => (
              <ShortjobListItem
                key={shortJob.jobId}
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
  );
}
