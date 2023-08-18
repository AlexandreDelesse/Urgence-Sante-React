import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getCrewByCrewId } from '../services/crew.service'

export default function ManualLogin() {
  const [form, setForm] = useState({ nom: '', code: '' })
  const navigate = useNavigate()

  const onChangeForm = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setForm((old) => ({ ...old, [name]: value }))
  }

  const onButtonClick = async () => {
    try {
      await getCrewByCrewId(`${form.code}&${form.nom}`)
      navigate('/missions')
    } catch (error) {
      alert('une erreur !!')
    }
  }

  return (
    <div className="mt-4">
      {Object.keys(form).map((el) => (
        <Form.Group className="mt-1">
          <Form.Label>{el}</Form.Label>
          <Form.Control
            key={el}
            onChange={onChangeForm}
            name={el}
            value={form[el]}
            type="text"
          />
        </Form.Group>
      ))}
      <Button className="mt-3" onClick={onButtonClick}>
        Login
      </Button>
    </div>
  )
}
