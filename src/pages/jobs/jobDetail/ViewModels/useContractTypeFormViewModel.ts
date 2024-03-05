import React, { useState } from "react";
import { ContractType } from "../../../../models/ContractType";
import { SelectedContractType } from "../../../../interfaces/SelectedContractType";

export default function useContractTypeFormViewModel() {
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [contractTypeValueOptions, setContractTypeValueOptions] = useState<
    string[]
  >([]);
  const [contractTypeSelected, setContractTypeSelected] =
    useState<ContractType | null>(null);
  const [contractTypeValue, setContractTypeValue] = useState("");

  const selectContractType = (id: number) => {
    const contractType = getContractTypeById(id);
    if (!contractType) return;
    setContractTypeSelected(contractType || null);
    setContractTypeValueOptions(contractType.values);
  };

  const initContractTypeSelected = (
    contractTypeList: ContractType[],
    contractTypeToInit: SelectedContractType | null
  ) => {
    setContractTypes(contractTypeList);
    if (!contractTypeToInit) {
      setContractTypeSelected(null);
      return;
    }
    const contractType = contractTypeList.find(
      (contract) => contract.id == contractTypeToInit.id
    );

    if (!contractType) return;
    setContractTypeSelected(contractType);
    setContractTypeValueOptions(contractType.values);
    setContractTypeValue(contractTypeToInit.selectedValue);
  };

  const getContractTypeById = (id: number) =>
    contractTypes.find((contract) => contract.id == id);

  const updateContractTypes = (contractTypes: ContractType[]) =>
    setContractTypes(contractTypes);

  const initContractTypeValue = (value: string) => setContractTypeValue(value);

  const updateContractTypeValue = (value: string) =>
    setContractTypeValue(value);

  return {
    updateContractTypes,
    contractTypes,
    contractTypeSelected,
    selectContractType,
    contractTypeValue,
    initContractTypeValue,
    updateContractTypeValue,
    setContractTypeValueOptions,
    contractTypeValueOptions,
    initContractTypeSelected,
  };
}
