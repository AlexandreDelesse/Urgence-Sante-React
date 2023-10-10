import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getAllCrews } from "../../services/crew.service";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import CrewCard from "./crewCard/CrewCard";
import "./crewList.css";
import UserContext from "../../contexts/User.context";
import CrewListLogin from "./crewListLogin/CrewListLogin";
import CrewListFilters from "./crewListFilters/CrewListFilters";
import { Container } from "react-bootstrap";

export default function CrewList() {
  const crewsQuery = useQuery("crews", getAllCrews);
  const userContext = useContext(UserContext);

  const [filters, setFilters] = useState({});

  const dataFilter = (data) => {
    if (!data) return [];
    return data.filter(
      (crew) =>
        !filters.searchValue ||
        (crew.peR_MEMBRE_1
          ? crew.peR_MEMBRE_1
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.peR_MEMBRE_2
          ? crew.peR_MEMBRE_2
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.veH_IMMATRICULATION
          ? crew.veH_IMMATRICULATION
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.eQ_LIBELLE
          ? crew.eQ_LIBELLE
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false)
    );
  };

  if (!userContext.hasLogged) return <CrewListLogin />;

  return (
    <Container>
      <CrewListFilters filters={filters} setFilters={setFilters} />

      <AsyncDataComponent
        data={crewsQuery}
        onSuccess={({ data }) => (
          <div className="crewList">
            {dataFilter(data).map((crew, index) => (
              <CrewCard key={index} crew={crew} />
            ))}
          </div>
        )}
      />
    </Container>
  );
}
