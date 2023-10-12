import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Alert } from "@mui/material";

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
    if (!data.error.request)
      return (
        <Alert severity="warning">
          {data.error.message || "Une erreur est survenue"}
        </Alert>
      );
    if (data.error.request.status < 500)
      return (
        <Alert severity="warning">
          {data.error.request.responseText ||
            `Une erreur est survenue : ${data.error.message}`}
        </Alert>
      );
    return (
      <Alert severity="error">
        {onErrorMessage() ||
          data.error.request.responseText ||
          `Une erreur est survenue : ${data.error.message}`}
      </Alert>
    );
  }

  return onSuccess(data);
}
