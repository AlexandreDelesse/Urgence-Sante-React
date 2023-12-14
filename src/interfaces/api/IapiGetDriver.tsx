import IDriverModel from '../model/IDriverModel'
import IVehicleModel from '../model/IVehicleModel'

export default interface IApiGetDriver {
  changeDate: string | null
  driversCollection: IDriverModel[]
  selectedDriverID: number | null
  vehicleModel: IVehicleModel
}
