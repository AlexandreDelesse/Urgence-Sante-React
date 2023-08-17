import React from 'react'
import { Container } from 'react-bootstrap'
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import AddVehiculeForm from '../components/forms/AddVehiculeForm'
import MissionDetail from '../components/mission/MissionDetail'

import BackButton from '../components/shared/BackButton'
import EmployeeDetail from '../pages/employees/EmployeeDetail'
import Employees from '../pages/employees/Employees'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Mission from '../pages/missions/Mission'
import TestApi from '../pages/TestApi'
import User from '../pages/User'
import VehiculeDetail from '../pages/vehicules/VehiculeDetail'
import Vehicules from '../pages/vehicules/Vehicules'

export default function AppRoutes() {
  const pathBackButtonExeptions = ['/', '/login']
  const { pathname } = useLocation()

  return (
    <Container>
      {pathBackButtonExeptions.includes(pathname) || <BackButton />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/:crewid" element={<Login />} />
        <Route path="login/*" element={<Home />} />
        <Route path="testApi" element={<TestApi />} />
        <Route path="user" element={<User />} />

        <Route path="missions" element={<Mission />} />
        <Route path="mission/:missionIndex" element={<MissionDetail />} />

        <Route path="employees" element={<Outlet />}>
          <Route index element={<Employees />} />
          <Route path=":id/detail/*" element={<EmployeeDetail />} />
        </Route>

        <Route path="vehicules" element={<Outlet />}>
          <Route index element={<Vehicules />} />
          <Route path="nouveau-vehicule" element={<AddVehiculeForm />} />
          <Route path=":id/detail" element={<VehiculeDetail />} />
        </Route>

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Container>
  )
}

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <h1 className="text-center mt-5">404 Not found</h1>
      <p onClick={() => navigate('/')} className="text-center">
        Retour au menu principal
      </p>
    </Container>
  )
}
