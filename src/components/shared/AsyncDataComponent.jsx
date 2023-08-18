import React from 'react'
import { Spinner } from 'react-bootstrap'
import Loader from './Loader'

export default function AsyncDataComponent({
  data,
  onLoadingMessage,
  onErrorMessage,
  onSuccess,
  onError,
  withRefetchLoader,
}) {
  console.log(data)
  console.log('onError : ', onError)
  //TODO: Add context error message
  if (data.status === 'loading' || (withRefetchLoader && data.isRefetching))
    return <Loader loadingMessage={onLoadingMessage || null} />
  if (data.status === 'error') {
    return onError ? (
      <div>{onError()}</div>
    ) : (
      <div className=" d-flex w-100 justify-content-center align-items-center">
        <>{onErrorMessage || data.error.message || 'An error occured'}</>
      </div>
    )
  }

  return onSuccess(data)
}
