export interface ShortJob {
  appointment: string;
  arrival: string;
  departure: string;
  index: number;
  isAck: boolean;
  isSerial: boolean;
  isTerminated: boolean;
  jobId: string;
  patient: string;
  schedule: string;
  transportMode: number;
  transportSens: number;
  transportType: number;
}
