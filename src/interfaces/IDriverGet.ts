import { Driver } from "../models/driver";
import { Vehicle } from "../models/vehicle";

export interface IDriverGet {
  drivers: Driver[];
  changeDate: Date;
  vehicle: Vehicle;
}
