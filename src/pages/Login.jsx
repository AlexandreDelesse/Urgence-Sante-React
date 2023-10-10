import React from "react";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { getCrewByCrewId } from "../services/crew.service";
import AsyncDataComponent from "../components/shared/AsyncDataComponent";

export default function Login() {
  const params = useParams();

  const crewToken = useQuery({
    queryKey: ["crewToken", params.crewid],
    queryFn: () => getCrewByCrewId(params.crewid),
  });

  return (
    <AsyncDataComponent
      data={crewToken}
      onSuccess={() => <Navigate to="/" />}
    />
  );
}
