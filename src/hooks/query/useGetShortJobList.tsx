import { useQuery } from "react-query";
import { getShortJobList } from "../../services/jobs.service";
import { useContext } from "react";
import UserContext from "../../contexts/User.context";
import FilterContext from "../../contexts/Filter.context";

export default function useGetShortJobList(userToken?: string | null) {
  const { showPastMission, setShowPastMission } = useContext(FilterContext);
  const { getToken } = useContext(UserContext);
  
  const gCrewToken = getToken();
  return useQuery(["shortJobList", gCrewToken, showPastMission], () =>
    getShortJobList(gCrewToken, showPastMission)
  );
}
