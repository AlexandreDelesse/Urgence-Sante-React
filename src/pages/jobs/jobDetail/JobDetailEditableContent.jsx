import { useState } from 'react'
import JobDetailEditableForm from './JobDetailEditableForm'
import ContractTypeSelector from '../../missions/missionDetails/missionOtherInformations/contractTypeSelector/ContractTypeSelector'
import EditableLabel from '../../../components/shared/editableLabel/EditableLabel'
import { Form } from 'react-bootstrap'
import ContractTypeValueSelector from '../../../components/forms/Contract/ContractTypeValueSelector'
import { nirValidator } from '../../../services/validator'
import EditableList from '../../../components/shared/editableList/EditableList'

export default function JobDetailEditableContent({
  jobDetailEditable,
  onSubmit,
  isMutating,
}) {
  const [formValue, setFormValue] = useState({
    jobId: jobDetailEditable.jobID,
    isPmtPresent: jobDetailEditable.isPmtPresent,
    selectedContractType: jobDetailEditable.selectedContractType,
    reference: jobDetailEditable.reference,
    nir: jobDetailEditable.nir,
    emails: jobDetailEditable.emails,
    ddn: jobDetailEditable.ddn,
    phones: jobDetailEditable.phones,
    comments: jobDetailEditable.comments,
  })

  const [hasChanged, setHasChanged] = useState(false)

  const contractType =
    formValue.selectedContractType &&
    jobDetailEditable.contractTypes.find(
      (contractType) =>
        contractType.id === parseInt(formValue.selectedContractType.id),
    )

  const handleOnChange = (name, value) => {
    setFormValue((old) => ({ ...old, [name]: value }))
    setHasChanged(true)
  }

  const submit = () => {
    onSubmit(formValue)
  }

  const fields = [
    {
      label: 'Date de naissance',
      name: 'ddn',
      type: 'date',
      format: (value) => (value ? value.split('T')[0] : ''),
      render: (field, onChange) => (
        <CustomFormControl
          name={field.name}
          value={formValue[field.name]}
          type={field.type}
          onChange={(e) =>
            onChange(field.name, new Date(e.target.value).toISOString())
          }
          format={field.format}
        />
      ),
    },
    {
      label: 'Type de contrat',
      name: 'selectedContractType',
      render: (field, onChange) => (
        <>
          <ContractTypeSelector
            name={field.name}
            value={formValue[field.name]}
            onChange={onChange}
            contractTypeList={jobDetailEditable.contractTypes}
          />
          <ContractTypeValueSelector
            name={field.name}
            value={formValue[field.name]}
            onChange={onChange}
            isPmtPresent={formValue.isPmtPresent}
            contractType={contractType}
            reference={formValue.reference}
          />
        </>
      ),
    },
    {
      label: 'N° sécurité sociale',
      name: 'nir',
      render: (field, onChange) => (
        <EditableLabel
          type="number"
          inputMode="numeric"
          validator={nirValidator}
          onChange={(value) => onChange(field.name, value)}
          initialValue={formValue[field.name]}
          placeholder="1 23 45 67 891 011 12"
        />
      ),
    },
    {
      label: 'Emails',
      name: 'emails',
      render: (field, onChange) => (
        <EditableList
          buttonLabel="Ajouter une adresse email"
          initialList={formValue[field.name]}
          placeholder="Cliquez pour renseigner l'email"
          onChange={(value) => onChange(field.name, value)}
        />
      ),
    },
    {
      label: 'Téléphones',
      name: 'phones',
      render: (field, onChange) => (
        <EditableList
          buttonLabel="Ajouter un téléphone"
          initialList={formValue[field.name]}
          placeholder="Cliquez pour renseigner le téléphone"
          onChange={(value) => onChange(field.name, value)}
        />
      ),
    },
    {
      name: 'comments',
      render: (field, onChange) => (
        <EditableLabel
          onChange={(element) => onChange(field.name, element)}
          initialValue={formValue[field.name]}
          placeholder="Ajouter un commentaire"
        />
      ),
    },
  ]

  return (
    <div>
      <JobDetailEditableForm
        jobDetailEditableValues={formValue}
        fields={fields}
        onChange={handleOnChange}
        onSubmit={submit}
        hasChanged={hasChanged}
        isLoading={isMutating}
      />
    </div>
  )
}

const CustomFormControl = ({ name, value, type, onChange, format }) => {
  const formattedValue = format ? format(value) : value
  return (
    <Form.Control
      value={formattedValue}
      type={type}
      name={name}
      onChange={onChange}
    />
  )
}
// value.split("T")[0] || ""

// const CustomCard = ({ title, content }) => {
//   return (
//     <Card>
//       <CardContent>
//         {title && <Form.Label>{title}</Form.Label>}
//         {content}
//       </CardContent>
//     </Card>
//   );
// };
