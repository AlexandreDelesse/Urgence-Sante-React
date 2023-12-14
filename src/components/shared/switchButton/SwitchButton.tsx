import { ToggleButton } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

interface ISwitchButtonProps {
  selected: boolean
  onChange: () => void
}

export default function SwitchButton({
  selected,
  onChange,
}: ISwitchButtonProps) {
  return (
    <ToggleButton
      value="value"
      selected={selected}
      onChange={onChange}
      color="primary"
      className={selected ? 'border-0' : ''}
    >
      <FilterAltIcon />
    </ToggleButton>
  )
}
