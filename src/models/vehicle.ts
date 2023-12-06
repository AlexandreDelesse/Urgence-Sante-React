export class Vehicle {
  vehicleId: number;
  immatriculation: string;

  constructor(id: number, immat: string) {
    this.vehicleId = id;
    this.immatriculation = immat;
  }
}
