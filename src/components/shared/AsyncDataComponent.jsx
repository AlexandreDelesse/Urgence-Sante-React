import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function AsyncDataComponent({
  data,
  onLoadingMessage,
  onErrorMessage,
  onSuccess,
  withRefetchLoader,
  onError,
}) {
  //TODO: Add context error message
  if (data.status === "loading" || (withRefetchLoader && data.isRefetching))
    return <Loader loadingMessage={onLoadingMessage || null} />;

  if (data.status === "error") {
    if (onError) return onError();
    return (
      <div className=" d-flex w-100 flex-column align-items-center">
        <p>{onErrorMessage || data.error.message || "An error occured"}</p>
        <p>Une erreur est survenue</p>
        <p>
          Rechargez la page ou Authentifiez vous : <Link to="login">Login</Link>
        </p>
      </div>
    );
  }

  return onSuccess(data);
}
