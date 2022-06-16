import vehiculesData from "../data/vehicules.data";

const getVehicules = () => {
  return vehiculesData;
};

const getVehiculeById = (id) => {
  return vehiculesData.find((vehicule) => vehicule.id === parseInt(id));
};

export { getVehicules, getVehiculeById };
