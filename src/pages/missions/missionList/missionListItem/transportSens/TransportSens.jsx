import React from "react";

export default function TransportSens({ sens }) {

  const transportSensEnum = { 1: "Aller", 2: "Retour" };

  return <>{transportSensEnum[sens]}</>;
}
