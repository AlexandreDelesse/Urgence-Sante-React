import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getVehicules } from "../../services/vehicule.service";

export default function useGetVehicules() {
  const [vehicules, setVehicules] = useState([]);

  useEffect(() => {
    getVehicules()
      .then((data) => setVehicules(data))
      .catch(() => setVehicules([]));
  }, []);

  return vehicules;
}
