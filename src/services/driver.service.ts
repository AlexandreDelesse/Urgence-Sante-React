import { PostDriverDTO } from "../components/shared/driverSwap/model/PostDriverDTO";
import { GetDriverDTO } from "../models/GetDriverDTO";
import { api } from "./api.config";

const pathDriver = "/Driver";

const getDriver = async (crewId: number | null): Promise<GetDriverDTO> => {
  try {
    const axiosReponse = await api.get(pathDriver, { params: { crewId } });
    return axiosReponse.data;
  } catch (error) {
    throw error;
  }
};

const swapDriver = async (newtDriver: PostDriverDTO | null) => {
  if (!newtDriver) return;
  try {
    return await api.post(pathDriver, newtDriver);
  } catch (error) {}
};

export { getDriver, swapDriver };
