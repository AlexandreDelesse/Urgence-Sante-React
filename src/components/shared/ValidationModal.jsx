import React from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'

export default function ValidationModal({
  show,
  onClose,
  onValidate,
  loading,
  title,
  message,
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        {message || 'Etes-vous sûr de vouloir éffectuer cette action ?'}{' '}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onValidate}>
          {loading && (
            <Spinner
              className="me-2"
              size="sm"
              variant="warning"
              animation="border"
            />
          )}
          Valider
        </Button>
        <Button variant="outline-secondary" onClick={onClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
