import React from 'react'
import Loader from './Loader'
import { Alert } from '@mui/material'

interface IAsyncDataComponentProps {
  query: any
  onLoadingMessage?: string
  onErrorMessage?: string
  onSuccess: (data: any) => any
  withRefetchLoader?: boolean
  onError?: (data?: any) => any
  withoutLoader?: boolean
}

export default function AsyncDataComponent({
  query,
  onLoadingMessage,
  onErrorMessage,
  onSuccess,
  withRefetchLoader,
  onError,
  withoutLoader,
}: IAsyncDataComponentProps) {
  //TODO: Add context error message
  //TODO: Ajouter un AsyncMultiDataComponent
  if (query.status === 'loading' || (withRefetchLoader && query.isRefetching))
    return withoutLoader ? null : (
      <Loader loadingMessage={onLoadingMessage || null} />
    )

  if (query.status === 'error') {
    if (onError) return onError()
    if (!query.error.request)
      return (
        <Alert severity="warning">
          {query.error.message || 'Une erreur est survenue'}
        </Alert>
      )
    if (query.error.request.status < 500)
      return (
        <Alert severity="warning">
          {query.error.request.responseText ||
            `Une erreur est survenue : ${query.error.message}`}
        </Alert>
      )
    return (
      <Alert severity="error">
        {onErrorMessage ||
          query.error.request.responseText ||
          `Une erreur est survenue : ${query.error.message}`}
      </Alert>
    )
  }

  return onSuccess(query.data)
}
