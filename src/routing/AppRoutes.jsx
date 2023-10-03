import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";

import BackButton from "../components/shared/BackButton";
import Login from "../pages/Login";
import ManualLogin from "../pages/ManualLogin";
import Mission from "../pages/missions/Mission";
import CrewList from "../pages/crewList/CrewList";
import MissionList from "../pages/missions/missionList/MissionList";
import MissionDetail from "../pages/missions/missionDetails/MissionDetail";
import { createHashRouter } from "react-router-dom";

export default function AppRoutes() {
  const pathBackButtonExeptions = ["/", "/login"];
  const { pathname } = useLocation();


  return (
    <Container fluid>
      {pathBackButtonExeptions.includes(pathname) || <BackButton />}
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="jobs/*" element={<Mission />} />

        <Route path="regul" element={<CrewList />} />
        <Route path="login/:crewid" element={<Login />} />
        <Route path="login/*" element={<ManualLogin />} />

        {/* <Route path="vehicules" element={<Outlet />}>
          <Route index element={<Vehicules />} />
          <Route path="nouveau-vehicule" element={<AddVehiculeForm />} />
          <Route path=":id/detail" element={<VehiculeDetail />} />
        </Route> */}

        {/* <Route path="/*" element={<Page404 />} /> */}
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
