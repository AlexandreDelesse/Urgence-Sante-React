import React from 'react'
import { Spinner } from 'react-bootstrap'
import Loader from './Loader'

export default function AsyncDataComponent({
  data,
  onLoadingMessage,
  onErrorMessage,
  onSuccess,
  withRefetchLoader,
}) {
  //TODO: Add context error message
  if (data.status === 'loading' || (withRefetchLoader && data.isRefetching))
    return <Loader loadingMessage={onLoadingMessage || null} />
  if (data.status === 'error')
    return (
      <div className=" d-flex w-100 justify-content-center align-items-center">
        <>{onErrorMessage || data.error.message || 'An error occured'}</>
      </div>
    )

  return onSuccess(data)
}
