import React from "react";
import { TbSteeringWheel } from "react-icons/tb";
import { Driver } from "../../../models/driver";
import { Spinner } from "react-bootstrap";
import { VscArrowSwap } from "react-icons/vsc";
import "./driverSwap.css";

interface DriverSwapProps {
  driver: Driver;
  isPending: boolean;
  onSwap: (id: number) => void;
}

export default function DriverSwap({
  driver,
  isPending,
  onSwap,
}: DriverSwapProps) {
  return (
    <div className="dsWrapper">
      <TbSteeringWheel size={20} />
      <span className="dsLabel">{driver.driverName || "pas de chauffeur"}</span>
      {isPending ? (
        <Spinner animation="border" role="status" variant="warning" size="sm" />
      ) : (
        <VscArrowSwap
          onClick={() => onSwap(driver.driverId)}
          size={16}
          color="orange"
        />
      )}
    </div>
  );
}
