import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getAllCrews } from "../../services/crew.service";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import CrewCard from "./crewCard/CrewCard";
import "./crewList.css";
import UserContext from "../../contexts/User.context";
import CrewListLogin from "./crewListLogin/CrewListLogin";
import CrewListFilters from "./crewListFilters/CrewListFilters";

export default function CrewList() {
  const crewsQuery = useQuery("crews", getAllCrews);
  const userContext = useContext(UserContext);

  const [filters, setFilters] = useState({});

  if (!userContext.hasLogged) return <CrewListLogin />;

  return (
    <>
      {/* <CrewListFilters filters={filters} setFilters={setFilters} /> */}

      <AsyncDataComponent
        data={crewsQuery}
        onSuccess={({ data }) => (
          <div>
            <div className="crewList p-5">
              {data
                .filter(
                  (crew) => filters || crew.eQ_LIBELLE === filters.searchValue
                )
                .map((crew, index) => (
                  <CrewCard key={index} crew={crew} />
                ))}
            </div>
          </div>
        )}
      />
    </>
  );
}
