import { useEffect, useState } from "react";
import { getVehiculeById } from "../../services/vehicule.service";

export default function useGetVehiculeById(id) {
  const [vehicule, setVehicule] = useState({});

  useEffect(() => {
    getVehiculeById(id)
      .then((data) => setVehicule(data))
      .catch(() => setVehicule({}));
  }, [id]);
  return vehicule;
}
