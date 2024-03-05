import { useState } from "react";
import { Driver } from "../model/Driver";
import useGetDriver from "../../../../hooks/query/useGetDriver";
import { GetDriverDTO } from "../model/GetDriverDTO";
import useDriverSwapMutation from "../../../../hooks/mutation/useDriverSwapMutation";

export default function DriverSwapViewModel() {
  const [driverSelected, setDriverSelected] = useState<Driver | null>(null);
  const [driversCollection, setDriversCollection] = useState<Driver[]>([]);
  const [lastTimeSwap, setLastTimeSwap] = useState("");

  const iniDriverSelected = (driver: Driver | null) =>
    setDriverSelected(driver);

  const iniDriverCollection = (drivers: Driver[]) =>
    setDriversCollection(drivers);

  const initLastTimeSwap = (isoDate: string | null) => {
    let time = "";
    if (isoDate) time = new Date(isoDate).toLocaleTimeString();
    setLastTimeSwap(time);
  };

  const initDataFromApiReponse = (data: GetDriverDTO) => {
    iniDriverSelected(data.selectedDriver || data.driversCollection[0]);
    iniDriverCollection(data.driversCollection);
    initLastTimeSwap(data.changeDate);
  };

  const { isLoading, isError } = useGetDriver(initDataFromApiReponse);
  const { isError: updateError, mutate } = useDriverSwapMutation();

  const selectNextDriver = () => {
    let nextDriverIndex = 0;
    if (!driverSelected) return;
    const currDriverIndex = driversCollection
      .map((driver) => driver.driverId)
      .indexOf(driverSelected.driverId);
    if (currDriverIndex < driversCollection.length - 1) {
      nextDriverIndex = currDriverIndex + 1;
    }
    mutate(driversCollection[nextDriverIndex].driverId);
  };

  return {
    lastTimeSwap,
    selectNextDriver,
    driverSelected,
    isLoading,
    isError,
    updateError,
  };
}
