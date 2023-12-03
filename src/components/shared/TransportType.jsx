import React from "react";
import { TbTruckReturn } from "react-icons/tb";

export default function TransportType({ type }) {
  const transportTypeEnum = {
    1: <TbTruckReturn size={30} />,
  };
  
  return transportTypeEnum[type] || <></>;
}
