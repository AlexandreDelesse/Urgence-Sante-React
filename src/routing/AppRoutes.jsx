import { Container } from 'react-bootstrap'
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom'

import Login from '../pages/Login'
import ManualLogin from '../pages/ManualLogin'
import CrewList from '../pages/crewList/CrewList'
import Jobs from '../pages/jobs/Jobs'
import JobDetailNavigation from '../pages/jobs/jobDetail/JobDetailNavigation'
import Signature from '../pages/missions/missionDetails/signature/Signature'
import JobDetail from '../pages/jobs/jobDetail/JobDetail'
import JobDetailEditable from '../pages/jobs/jobDetail/JobDetailEditable'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="jobs" />} />

      <Route path="jobs/*" element={<Outlet />}>
        <Route index element={<Jobs />} />
        <Route path=":jobId/*" element={<JobDetailNavigation />}>
          <Route index element={<Navigate to="detail" />} />
          <Route path="detail" element={<JobDetail />} />
          <Route path="detailEditable" element={<JobDetailEditable />} />
          <Route path="signature" element={<Signature />} />
        </Route>
      </Route>

      <Route path="regul" element={<CrewList />} />
      <Route path="login/:crewid" element={<Login />} />
      <Route path="login/*" element={<ManualLogin />} />

      {/* <Route path="vehicules" element={<Outlet />}>
          <Route index element={<Vehicules />} />
          <Route path="nouveau-vehicule" element={<AddVehiculeForm />} />
          <Route path=":id/detail" element={<VehiculeDetail />} />
        </Route> */}

      <Route path="/*" element={<Page404 />} />
    </Routes>
  )
}

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <h1 className="text-center mt-5">404 Not found</h1>
      <p onClick={() => navigate('/')} className="text-center">
        Retour a la page principale
      </p>
    </Container>
  )
}
