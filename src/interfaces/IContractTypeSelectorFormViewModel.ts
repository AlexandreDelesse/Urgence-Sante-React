import { ContractType } from "../models/ContractType";
import { SelectedContractType } from "./SelectedContractType";

export interface IContractTypeSelectorFormViewModel {
  selectContractType: (id: number) => any;
  updateContractTypes: (contractTypes: ContractType[]) => any;
  contractTypes: ContractType[];
  contractTypeSelected: ContractType | null;
  contractTypeValue: string;
  initContractTypeValue: (value: string) => any;
  updateContractTypeValue: (value: string) => any;
  contractTypeValueOptions: string[];
  setContractTypeValueOptions: (value: string[]) => any;
  initContractTypeSelected: (
    contractTypeList: ContractType[],
    selectedContract: SelectedContractType
  ) => any;
}
