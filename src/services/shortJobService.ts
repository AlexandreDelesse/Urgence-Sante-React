import { IShortJobService } from "../interfaces/shortJob/IShortJobService";
import { getJobList } from "./job.service";

export class ShortJobService implements IShortJobService {
  public getAll() {
    return getJobList();
  }
}
