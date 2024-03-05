import { useMutation, useQueryClient } from "react-query";
import { swapDriver } from "../../services/driver.service";
import { useContext } from "react";
import UserContext from "../../contexts/User.context";

export default function useDriverSwapMutation() {
  const queryClient = useQueryClient();
  const { crew } = useContext(UserContext);
  const crewId = crew?.crewId || null;
  return useMutation(
    (driverId: number) => swapDriver(crewId ? { driverId, crewId } : null),
    {
      onSuccess: () => queryClient.invalidateQueries(["driver", crewId]),
    }
  );
}
