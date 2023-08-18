import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader({ loadingMessage }) {
  return (
    <div className="mt-3 d-flex w-100 flex-column justify-content-center align-items-center">
      <Spinner animation="border" variant="warning" />
      {loadingMessage && <p className="mt-3">{loadingMessage}</p>}
    </div>
  )
}
