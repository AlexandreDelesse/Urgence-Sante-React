import { api } from "./api.config";
import { storeToken } from "./user.service";

/**
 * Retourne un token pour l'équipage identifié avec un id et un nom d'employée
 * @param {String} crewId
 * @returns CrewToken as String
 */
const getCrewByCrewId = async (crewId) => {
  console.log(crewId);
  try {
    const [id, employee] = crewId.split("&");
    const { data: resp } = await api.post("/login", {
      id,
      employee,
    });
    storeToken(resp.token);
    return resp;
  } catch (error) {
    throw error;
  }
};

const getAllCrews = async () => {
  try {
    const { data: crews } = await api.get("Login");
    return crews;
  } catch (error) {
    throw error;
  }
};

export { getCrewByCrewId, getAllCrews };
