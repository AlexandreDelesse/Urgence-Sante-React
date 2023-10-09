import React from "react";
import MissionList from "./missionList/MissionList";
import { Route, Routes } from "react-router-dom";
import MissionDetail from "./missionDetails/MissionDetail";
import { Col } from "react-bootstrap";

export default function Mission() {
  // return <MissionList />;
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <Routes>
        <Route index element={<MissionList />} />
        <Route path="jobdetail/:jobId/*" element={<MissionDetail />} />
      </Routes>
    </Col>
  );
}
