import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function AsyncDataComponent({
  data,
  onLoadingMessage,
  onErrorMessage,
  onSuccess,
}) {
  //TODO: Add context error message
  console.log('data from async', data)
  if (data.status === 'loading')
    return (
      <div className=" d-flex w-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="warning" />
      </div>
    )
  if (data.status === 'error')
    return <>{onErrorMessage || 'An error occured'}</>

  return onSuccess(data)
}