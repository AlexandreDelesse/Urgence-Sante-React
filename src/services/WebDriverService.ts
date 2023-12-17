import { IDriverGet } from "../interfaces/IDriverGet";
import { IDriverGetService } from "../interfaces/IDriverGetService";
import { api } from "./api.config";

export class WebDriverGetService implements IDriverGetService {
  public async getAll(crewId: number) {
    try {
      const result = await api.get("Driver", { params: { CrewId: crewId } });
      const driverGet: IDriverGet = {
        changeDate: result.data.changeDate,
        drivers: result.data.driversCollection,
        vehicle: result.data.vehicleModel,
      };
      return driverGet;
    } catch (error) {
      throw error;
    }
  }
}
