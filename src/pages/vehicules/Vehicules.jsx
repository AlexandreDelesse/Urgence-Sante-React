import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBar from "../../components/shared/SearchBar";
import VehiculesTable from "../../components/tables/VehiculesTable";
import useVehiculeFilter from "../../hooks/filters/useVehiculeFilter";
import { getVehicules } from "../../services/vehicule.service";
import { useNavigate, Outlet } from "react-router-dom";

export default function Vehicules() {
  const [filters, setFilters] = useState(null);

  const navigate = useNavigate();

  const handleOnFilterChange = (filter) => {
    setFilters(filter);
  };

  const vehicules = useVehiculeFilter({ list: getVehicules(), filters });

  return (
    <Container>
      <Button onClick={() => navigate("nouveau-vehicule")} className="my-3">
        Nouveau vehicule
      </Button>
      <SearchBar onFilterChange={handleOnFilterChange} />
      <VehiculesTable vehicules={vehicules} />
      <Outlet />
    </Container>
  );
}
