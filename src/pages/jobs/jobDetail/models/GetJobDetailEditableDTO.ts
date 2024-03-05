import { ContractType } from "../../../../models/ContractType";
import { ShortContractType } from "./ShortContractType";

export interface getJobDetailEditableDTO {
  comments: string;
  contractTypes: ContractType[];
  ddn: string;
  emails: string[];
  isPmtPresent: boolean;
  isSign: boolean;
  jobID: string;
  nir: string;
  phones: string[];
  reference: string;
  selectedContractType: ShortContractType;
}
