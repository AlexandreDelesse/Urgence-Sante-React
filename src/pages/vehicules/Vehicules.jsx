import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import SearchBar from "../../components/shared/SearchBar";
import VehiculesTable from "../../components/tables/VehiculesTable";
import useVehiculeFilter from "../../hooks/filters/useVehiculeFilter";
import { useNavigate, Outlet } from "react-router-dom";
import VehiculeCardList from "../../components/cardList/VehiculeCardList";
import useGetVehicules from "../../hooks/getter/useGetVehicules";

export default function Vehicules() {
  const [filters, setFilters] = useState(null);
  const [displayCard, setDisplayCard] = useState(false);

  const navigate = useNavigate();

  const handleOnFilterChange = (filter) => {
    setFilters(filter);
  };

  const toggleDisplayCard = () => {
    setDisplayCard(!displayCard);
  };

  const vehicules = useGetVehicules();

  const filteredVehicules = useVehiculeFilter({ list: vehicules, filters });

  return (
    <Container>
      <Button onClick={() => navigate("nouveau-vehicule")} className="my-3">
        Nouveau vehicule
      </Button>
      <SearchBar onFilterChange={handleOnFilterChange} />
      <DisplayToggler
        toggleDisplay={toggleDisplayCard}
        displayValue={displayCard}
      />
      {displayCard ? (
        <VehiculeCardList vehicules={filteredVehicules} />
      ) : (
        <VehiculesTable vehicules={filteredVehicules} />
      )}
      <Outlet />
    </Container>
  );
}

const DisplayToggler = ({ toggleDisplay, displayValue }) => {
  return (
    <div>
      Affichage
      <Form.Check
        onChange={toggleDisplay}
        isValid={displayValue}
        type="switch"
        id="custom-switch"
        label={displayValue ? "card" : "list"}
      />
    </div>
  );
};
