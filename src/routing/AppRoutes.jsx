import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import AddVehiculeForm from "../components/forms/AddVehiculeForm";
import Home from "../pages/Home";
import Login from "../pages/Login";
import VehiculeDetail from "../pages/vehicules/VehiculeDetail";
import Vehicules from "../pages/vehicules/Vehicules";
import AuthenticatedRoute from "./AuthenticatedRoute";

export default function AppRoutes() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          path="vehicules"
          element={<AuthenticatedRoute element={<Outlet />} />}
        >
          <Route path="nouveau-vehicule" element={<AddVehiculeForm />} />
          <Route index element={<Vehicules />} />
          <Route path=":id/detail" element={<VehiculeDetail />} />
        </Route>
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
        Retour au menu principal
      </p>
    </Container>
  );
};
