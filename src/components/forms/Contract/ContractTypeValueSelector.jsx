import React from "react";
import { Form } from "react-bootstrap";
import EditableLabel from "../../shared/editableLabel/EditableLabel";

export default function ContractTypeValueSelector({
  value,
  name,
  contractType,
  isPmtPresent,
  reference,
  onChange,
}) {
  const handleSelectedValue = (e) => {
    const { value: selectedValue } = e.target;
    const selectedContractType = { ...value, selectedValue };
    onChange(name, selectedContractType);
  };

  if (!contractType) return <></>;
  return (
    <>
      {contractType.hasPmt && (
        <Form.Group className="mt-3 mb-1">
          <Form.Check
            checked={!!isPmtPresent}
            type="checkbox"
            label="J'ai une préscription médicale"
            onChange={() => onChange("isPmtPresent", !isPmtPresent)}
          />
        </Form.Group>
      )}

      {contractType.values.length > 0 && (
        <Form.Group className="my-2">
          <Form.Select
            value={value.selectedValue}
            name="selectedValue"
            onChange={handleSelectedValue}
          >
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
          <EditableLabel
            onChange={(element) => onChange("reference", element)}
            initialValue={reference || ""}
            placeholder={contractType.referenceLabel}
          />
        </div>
      )}
    </>
  );
}
