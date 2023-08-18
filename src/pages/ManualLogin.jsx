import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/shared/Loader'
import { getCrewByCrewId } from '../services/crew.service'

export default function ManualLogin() {
  const [form, setForm] = useState({ nom: '', code: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChangeForm = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setForm((old) => ({ ...old, [name]: value }))
  }

  const onButtonClick = async () => {
    try {
      setLoading(true)
      await getCrewByCrewId(`${form.code}&${form.nom}`)
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-center">Authentification</h2>
      {Object.keys(form).map((el) => (
        <Form.Group className="mt-1" key={el}>
          <Form.Label>{el}</Form.Label>
          <Form.Control
            onChange={onChangeForm}
            name={el}
            value={form[el]}
            type="text"
          />
        </Form.Group>
      ))}
      <Button className="mt-3" onClick={onButtonClick}>
        {loading ? <Loader /> : 'Login'}
      </Button>
    </div>
  )
}
