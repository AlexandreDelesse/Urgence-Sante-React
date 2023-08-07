import React, { useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { createVehicule } from '../../services/vehicule.service'

export default function AddVehiculeForm() {
  const [input, setInput] = useState({ name: '' })
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(createVehicule, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('vehicules')
    },
  })

  const types = ['vsl', 'ambulance', 'sang']

  const handleOnInputChange = (e) => {
    const { name, value } = e.target
    setInput((old) => ({ ...old, [name]: value }))
  }

  const handleOnValidateClick = async () => {
    try {
      await mutation.mutateAsync(input)
      navigate(-1)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Form as="div" className="col-sm-8 col-md-5 mt-5 m-auto">
      <Form.Group className="my-3">
        <Form.Label>Nom du vehicule</Form.Label>
        <Form.Control
          value={input.name}
          name="name"
          onChange={handleOnInputChange}
          type="text"
          placeholder="Entrez un nom"
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Form.Label>Type de vehicule</Form.Label>
        <Form.Select
          value={input.type}
          name="type"
          onChange={handleOnInputChange}
          type="text"
        >
          <option>Select type</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="my-3">
        <Form.Label>Immatriculation</Form.Label>
        <Form.Control
          value={input.immat}
          name="immat"
          onChange={handleOnInputChange}
          type="text"
          placeholder="Entrez l'immatriculation"
        />
      </Form.Group>

      <Form.Group className="my-3">
        <Form.Label>Nombre de Km</Form.Label>
        <Form.Control
          value={input.km}
          name="km"
          onChange={handleOnInputChange}
          type="number"
          placeholder="Entrez le nombre de Km"
        />
      </Form.Group>
      {error && (
        <Alert
          variant="warning"
          onClose={() => setError(null)}
          dismissible
          className="mt-3"
        >
          {error}
        </Alert>
      )}
      <Button
        type="button"
        variant="outline-danger"
        onClick={() => navigate(-1)}
        className="mt-2"
      >
        Annuler
      </Button>
      <Button type="button" onClick={handleOnValidateClick} className="mt-2 ms-3">
        {mutation.isLoading && (
          <Spinner
            className="me-2"
            as="span"
            animation="border"
            size="sm"
            role="status"
          />
        )}
        Ajouter
      </Button>
    </Form>
  )
}
