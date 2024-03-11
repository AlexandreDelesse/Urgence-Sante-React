import { Button, Card, CardContent } from '@mui/material'
import React from 'react'
import { CardHeader, CardTitle } from 'react-bootstrap'
import OutlinedTextField from '../jobs/jobDetail/JobDetailEditableFormFieldsViews/OutlinedTextField'
import UserLoginViewModel from './UserLoginViewModel'

export default function UserLoginView() {
  const { code, name, setCode, setName, submit } = UserLoginViewModel()
  return (
    <Card sx={{ my: 2 }} elevation={0}>
      <CardContent>
        <OutlinedTextField
          label={'Nom'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <OutlinedTextField
          label={'Code'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          onClick={submit}
          size="medium"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </CardContent>
    </Card>
  )
}
