import React from "react";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { getCrewByCrewId } from "../services/crew.service";

export default function Login() {
  const params = useParams();

  const crewToken = useQuery({
    queryKey: ["crewToken", params.crewid],
    queryFn: () => getCrewByCrewId(params.crewid),
  });

  if (crewToken.isLoading)
    return <Loader loadingMessage="Authentification.." />;

  if (crewToken.isSuccess) return <Navigate to="/" />;

  if (crewToken.isError)
    return (
      // form as div to prevent trigger form on pressing 'enter' key
      <div>
        <p>This is login page</p>
        <p>And an error occured</p>
      </div>
    );
}
