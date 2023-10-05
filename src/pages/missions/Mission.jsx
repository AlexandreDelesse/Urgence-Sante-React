import React from "react";
import MissionList from "./missionList/MissionList";
import { Route, Routes } from "react-router-dom";
import MissionDetail from "./missionDetails/MissionDetail";

export default function Mission() {
  // return <MissionList />;
  return (
    <div>
      <Routes>
        <Route index element={<MissionList />} />
        <Route path="jobdetail/:jobId/*" element={<MissionDetail />} />
      </Routes>
    </div>
  );
}
