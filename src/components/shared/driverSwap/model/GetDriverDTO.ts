import { Driver } from "./Driver";

export interface GetDriverDTO {
  driversCollection: Driver[];
  selectedDriver: Driver | null;
  changeDate: string | null;
  vehiculModel: string | null;
}
