import { Button } from '@mui/material'
import { TbSteeringWheel } from 'react-icons/tb'

interface IDriverSwapViewProps {
  isLoading: boolean
  onClick: () => void
  label?: string
  fromTime: string
}

export default function DriverSwapView({
  isLoading,
  onClick,
  label,
  fromTime,
}: IDriverSwapViewProps) {
  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      size="large"
      variant="contained"
      color="primary"
      startIcon={<TbSteeringWheel size={20} />}
      fullWidth
    >
      {isLoading || `${label} - ${fromTime}` || 'Erreur chauffeur'}
    </Button>
  )
}
