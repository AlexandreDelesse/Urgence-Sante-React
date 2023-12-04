import React, { useState } from "react";
import { TbSteeringWheel } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";
import "./driverSwap.css";
import { getDrivers } from "../../../services/user.service";
import { Spinner } from "react-bootstrap";

export default function DriverSwap() {
  const driverNames = getDrivers() || [];
  const [driverId, setDriverId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const driverName = driverId === 0 ? driverNames[0] : driverNames[1];

  const toggleDriverId = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDriverId((old) => (old === 0 ? 1 : 0));
    }, 300);
  };

  if (driverNames.length < 2) return null;

  return (
    <div className="dsWrapper">
      <TbSteeringWheel size={20} />
      <span className="dsLabel">{driverName || "pas de chauffeur"}</span>
      {isLoading ? (
        <Spinner animation="border" role="status" variant="warning" size="sm" />
      ) : (
        <VscArrowSwap onClick={toggleDriverId} size={16} color="orange" />
      )}
    </div>
  );
}
