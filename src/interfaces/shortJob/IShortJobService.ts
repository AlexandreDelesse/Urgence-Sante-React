import { JobShort } from "./IShortJob";

interface IShortJobService {
  getAll: () => Promise<JobShort[]>;
}

export type { IShortJobService };
