import { useQuery } from "react-query";
import { getShortJobList } from "../../services/jobs.service";
import { useContext } from "react";
import FilterContext from "../../contexts/Filter.context";

export default function useGetShortJobList() {
  const { showPastMission, setShowPastMission } = useContext(FilterContext);

  return useQuery(["shortJobList", showPastMission], () =>
    getShortJobList(showPastMission)
  );
}
