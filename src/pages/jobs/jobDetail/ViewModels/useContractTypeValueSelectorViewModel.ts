import React, { useState } from "react";
import { ContractType } from "../../../../models/ContractType";

export default function useContractTypeValueSelectorViewModel() {
  const [ContractTypeSelected, setContractTypeSelected] =
    useState<ContractType | null>(null);

  const updateContractTypeSelected = (ContractType: ContractType) =>
    setContractTypeSelected(ContractType);

  return {};
}
