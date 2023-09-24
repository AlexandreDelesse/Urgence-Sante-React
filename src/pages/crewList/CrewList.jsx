import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getAllCrews } from "../../services/crew.service";
import AsyncDataComponent from "../../components/shared/AsyncDataComponent";
import CrewCard from "./crewCard/CrewCard";
import "./crewList.css";
import UserContext from "../../contexts/User.context";
import CrewListLogin from "./crewListLogin/CrewListLogin";

export default function CrewList() {
  const crewsQuery = useQuery("crews", getAllCrews);
  const userContext = useContext(UserContext);

  if (!userContext.hasLogged) return <CrewListLogin />;

  return (
    <AsyncDataComponent
      data={crewsQuery}
      onSuccess={({ data }) => (
        <div>
          <div className="crewList p-5">
            {data.map((crew, index) => (
              <CrewCard key={index} crew={crew} />
            ))}
          </div>
        </div>
      )}
    />
  );
}
