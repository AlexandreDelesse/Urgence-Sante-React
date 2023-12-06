import { IShortJob } from "./IShortJob";

interface IShortJobService {
  getAll: () => Promise<IShortJob[]>;
  aknowledge: (jobId: string) => Promise<void>;
}

export type { IShortJobService };
