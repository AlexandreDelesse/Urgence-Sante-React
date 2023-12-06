import { IShortJobService } from "../interfaces/shortJob/IShortJobService";
import { ackJobById, getJobList } from "./job.service";

export class ShortJobService implements IShortJobService {
  public getAll() {
    return getJobList();
  }

  public aknowledge(jobId: string) {
    return ackJobById(jobId);
  }
}
