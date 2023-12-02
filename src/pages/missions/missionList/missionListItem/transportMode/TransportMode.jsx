import React from "react";

export default function TransportMode({ mode }) {
  const transportModeEnum = {
    1: "Ambulance",
    2: "Vsl",
    3: "Taxi",
    4: "SNG",
  };
  return <div>{transportModeEnum[mode]}</div>;
}
