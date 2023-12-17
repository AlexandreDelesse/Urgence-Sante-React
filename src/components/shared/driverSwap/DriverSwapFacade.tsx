import DriverSwap from "./DriverSwap";
import { Driver } from "../../../models/driver";
import { useState } from "react";

interface DriverSwapFacadeProps {
  drivers: Driver[];
}

export default function DriverSwapFacade({ drivers }: DriverSwapFacadeProps) {
  const [currentDriver, setCurrentDriver] = useState(drivers[0]);

  const onSwap = (driverId: number) => {
    const currentDriverindex = drivers
      .map((driver) => driver.driverId)
      .indexOf(driverId);

    const nextDriver =
      currentDriverindex < drivers.length - 1
        ? drivers[currentDriverindex + 1]
        : drivers[0];

    setCurrentDriver(nextDriver);
  };
  if (drivers.length < 2) return null;

  return (
    <DriverSwap driver={currentDriver} isPending={false} onSwap={onSwap} />
  );
}
