import { IDriverGet } from "./IDriverGet";

export interface IDriverGetService {
  getAll: (crewId: number) => Promise<IDriverGet>;
}
