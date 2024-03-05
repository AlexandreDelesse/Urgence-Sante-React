import { Driver } from "./Driver";

export interface IDriverSwapViewModel {
  driverSelected: Driver | null;
  selectDriver: Driver;
}
