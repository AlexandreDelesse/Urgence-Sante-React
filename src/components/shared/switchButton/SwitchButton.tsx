import { Box, ToggleButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {selected ? <VisibilityIcon /> : <VisibilityOffIcon />}
        Missions terminées
      </Box>
    </ToggleButton>
  )
}
