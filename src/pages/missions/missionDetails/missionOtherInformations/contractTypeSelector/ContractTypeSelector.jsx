import React from "react";
import { Form } from "react-bootstrap";

export default function ContractTypeSelector({
  name,
  value,
  onChange,
  contractTypeList,
}) {
  const onContractTypeChanges = (e) => {
    const { name, value: contractId } = e.target;
    const contractType = contractId === "-1" ? {} : { id: contractId };
    onChange(name, contractType);
  };

  // const onSelectedValueChanges = (valueSelected) => {
  //   onChange(name, {
  //     ...value,
  //     selectedValue: valueSelected === "-1" ? null : valueSelected,
  //   });
  // };

  return (
    <Form.Group>
      <Form.Select
        name={name}
        value={value?.id || -1}
        onChange={onContractTypeChanges}
      >
        <option value={-1}>Choisissez un type de contrat</option>
        {contractTypeList.map((contractType) => (
          <option key={contractType.id} value={contractType.id}>
            {contractType.name}
          </option>
        ))}
      </Form.Select>

      {/* <ContractTypeForm
        value={value.selectedValue}
        contractType={contractTypeList.find(
          (contractType) => contractType.id === parseInt(value.id)
        )}
        formValues={formValues}
        onFormChanges={onChange}
        onSelectValue={onSelectedValueChanges}
      /> */}
    </Form.Group>
  );
}

// const ContractTypeForm = ({
//   value,
//   contractType,
//   formValues,
//   onFormChanges,
//   onSelectValue,
// }) => {
//   const handleSelectedValue = (e) => {
//     const { value } = e.target;
//     onSelectValue(value);
//   };

//   if (!contractType) return <></>;
//   return (
//     <>
//       {contractType.hasPmt && (
//         <Form.Group className="mt-3 mb-1">
//           <Form.Check
//             checked={formValues.isPmtPresent}
//             type="checkbox"
//             label="J'ai une préscription médicale"
//             onChange={() =>
//               onFormChanges("isPmtPresent", !formValues.isPmtPresent)
//             }
//           />
//         </Form.Group>
//       )}

//       {contractType.values.length > 0 && (
//         <Form.Group className="my-2">
//           <Form.Select value={value} onChange={handleSelectedValue}>
//             <option value={-1}>Selectionnez une valeur</option>
//             {contractType.values.map((value) => (
//               <option key={value} value={value}>
//                 {value}
//               </option>
//             ))}
//           </Form.Select>
//         </Form.Group>
//       )}

//       {contractType.hasReference && (
//         <div className="ps-1 mt-2">
//           <EditableLabel
//             onChange={(element) => onFormChanges("reference", element)}
//             initialValue={formValues.reference || ""}
//             placeholder={contractType.referenceLabel}
//           />
//         </div>
//       )}
//     </>
//   );
// };
