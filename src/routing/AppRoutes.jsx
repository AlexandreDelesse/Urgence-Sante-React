import React from "react";
import { Container } from "react-bootstrap";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import BackButton from "../components/shared/BackButton";
import Login from "../pages/Login";
import ManualLogin from "../pages/ManualLogin";
import Mission from "../pages/missions/Mission";
import CrewList from "../pages/crewList/CrewList";
import Jobs from "../pages/jobs/Jobs";
import MissionDetail from "../pages/missions/missionDetails/MissionDetail";
import JobDetailNavigation from "../pages/jobs/jobDetail/JobDetailNavigation";
import MissionOtherInformations from "../pages/missions/missionDetails/missionOtherInformations/MissionOtherInformations";
import Signature from "../pages/missions/missionDetails/signature/Signature";
import JobDetail from "../pages/jobs/jobDetail/JobDetail";

export default function AppRoutes() {
  const pathBackButtonExeptions = ["/", "/login", "/regul", "/jobs"];
  const { pathname } = useLocation();

  return (
    <Container fluid>
      {pathBackButtonExeptions.includes(pathname) || <BackButton />}
      <Routes>
        <Route path="/" element={<Navigate to="jobs" />} />

        <Route path="jobs/*" element={<Outlet />}>
          <Route index element={<Jobs />} />
          <Route path=":jobId/*" element={<JobDetailNavigation />}>
            <Route index element={<Navigate to="detail" />} />
            <Route path="detail" element={<JobDetail />} />
            <Route
              path="detailEditable"
              element={<MissionOtherInformations />}
            />
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
    </Container>
  );
}

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-center mt-5">404 Not found</h1>
      <p onClick={() => navigate("/")} className="text-center">
        Retour a la page principale
      </p>
    </Container>
  );
};
