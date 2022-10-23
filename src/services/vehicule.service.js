import { api } from "./api.config";

const getVehicules = async () => {
  try {
    const { data: vehicules } = await api.get("vehicules");
    return vehicules;
  } catch (error) {
    throw error;
  }
};

const getVehiculeById = async (id) => {
  console.log("hi from function getVehiculeById");
  try {
    const { data: vehicule } = await api.get(`vehicule/${id}`);
    console.log("vehicule : ", vehicule);
    return vehicule;
  } catch (error) {
    throw error;
  }
};

const createVehicule = async (vehicule) => {
  try {
    const { data } = await api.post("vehicules", vehicule);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteVehiculeById = async (id) => {
  try {
    const response = await api.delete(`vehicule/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export { getVehicules, getVehiculeById, createVehicule, deleteVehiculeById };
