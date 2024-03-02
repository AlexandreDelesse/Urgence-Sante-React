export interface ContractType {
  id: number;
  hasPmt: boolean;
  hasReference: boolean;
  name: string;
  referenceLabel: string;
  values: string[];
}
