import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import EditableLabel from "../../../../../components/shared/editableLabel/EditableLabel";

export default function ContractTypeSelector({
  contractTypeList,
  formValues,
  onFormChanges,
  initialValue,
}) {
  const [selectedContractType, setSelectedContractType] = useState(
    initialValue
      ? contractTypeList.find((contract) => contract.id === initialValue.id)
      : null
  );

  const onSelectChanges = (value) => {
    const contractType = contractTypeList.find(
      (contract) => contract.id === parseInt(value)
    );
    contractType.selectedValue = null;
    setSelectedContractType(contractType || null);
    onFormChanges("selectedContractType", contractType || null);
  };

  const onSelectValue = (value) => {
    const newContractType = selectedContractType;
    newContractType.selectedValue = value === "-1" ? null : value;
    setSelectedContractType(newContractType);
    onFormChanges("selectedContractType", newContractType);
  };

  return (
    <Form.Group>
      <Form.Label>Type de contrat</Form.Label>
      <Form.Select
        value={selectedContractType ? selectedContractType.id : -1}
        onChange={(e) => onSelectChanges(e.target.value)}
      >
        <option value={-1}>Choisissez un type de contrat</option>
        {contractTypeList.map((contractType) => (
          <option key={contractType.id} value={contractType.id}>
            {contractType.name}
          </option>
        ))}
      </Form.Select>

      <ContractTypeForm
        contractType={selectedContractType}
        formValues={formValues}
        onFormChanges={onFormChanges}
        onSelectValue={onSelectValue}
        initialValue={initialValue ? initialValue.selectedValue : null}
      />
    </Form.Group>
  );
}

const ContractTypeForm = ({
  contractType,
  formValues,
  onFormChanges,
  onSelectValue,
  initialValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || -1);

  const handleSelectedValue = (e) => {
    setSelectedValue(e.target.value);
    onSelectValue(e.target.value);
  };

  if (!contractType) return <></>;
  return (
    <>
      {contractType.hasPmt && (
        <Form.Group className="mt-3 mb-1">
          <Form.Check
            checked={formValues.isPmtPresent}
            type="checkbox"
            label="J'ai une préscription médicale"
            onChange={() =>
              onFormChanges("isPmtPresent", !formValues.isPmtPresent)
            }
          />
        </Form.Group>
      )}

      {contractType.values.length > 0 && (
        <Form.Group className="my-2">
          <Form.Select value={selectedValue} onChange={handleSelectedValue}>
            <option value={-1}>Selectionnez une valeur</option>
            {contractType.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      {contractType.hasReference && (
        <div className="ps-1 mt-2">
          <Form.Label>{contractType.referenceLabel}</Form.Label>
          <EditableLabel
            onChange={(element) => onFormChanges("reference", element)}
            initialValue={formValues.reference || ""}
            placeholder={contractType.referenceLabel}
          />
        </div>
      )}
    </>
  );
};
