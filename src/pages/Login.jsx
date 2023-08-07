import React, { useContext, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import UserContext from '../contexts/User.context'
import { getCrewByCrewId } from '../services/crew.service'
import { login } from '../services/user.service'

export default function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const crew = useQuery({
    queryKey: ['crew', params.crewid],
    queryFn: () => getCrewByCrewId(params.crewid),
  })

  const [input, setInput] = useState({ name: '' })
  const [error, setError] = useState(null)

  const handleOnInputChange = (e) => {
    const { name, value } = e.target
    setInput((old) => ({ ...old, [name]: value }))
  }

  const handleOnLogin = () => {
    if (!input.name) return
    try {
      const user = login(input)
      if (!user) return
      setUser(user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    // form as div to prevent trigger form on pressing 'enter' key
    <div>
      <h3 className="my-3">Membres de l'équipage n°{params.crewid} </h3>
      <AsyncDataComponent
        data={crew}
        onSuccess={({ data }) => (
          <div className="my-3">
            {data.crewMembers.map((cm) => (
              <p key={cm}>{cm}</p>
            ))}
          </div>
        )}
        onErrorMessage="Pas d'équipage pour cet ID"
      />
    </div>
    // <Form as="div" className="col-md-6 mt-5 m-auto p-3 border rounded">
    //   <Form.Group>
    //     <Form.Label>Identifiant</Form.Label>
    //     <Form.Control
    //       value={input.name}
    //       name="name"
    //       onChange={handleOnInputChange}
    //       type="text"
    //       placeholder="Entrez votre identifiant"
    //     />
    //   </Form.Group>
    //   {error && (
    //     <Alert
    //       variant="warning"
    //       onClose={() => setError(null)}
    //       dismissible
    //       className="mt-3"
    //     >
    //       {error}
    //     </Alert>
    //   )}
    //   <Button type="button" onClick={handleOnLogin} className="mt-2">
    //     Login
    //   </Button>
    // </Form>
  )
}
