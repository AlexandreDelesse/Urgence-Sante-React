import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore'
import InfoIcon from '@mui/icons-material/Info'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import BottomNav from '../../missions/missionDetails/bottomNav/BottomNav'
import BackButton from '../../../components/shared/BackButton'

export default function JobDetailNavigation() {
  const navigate = useNavigate()
  const tabs = [
    {
      link: '',
      label: 'Mission',
      icon: <InfoIcon />,
    },
    {
      link: 'detailEditable',
      label: 'Details',
      icon: <RestoreIcon />,
    },
    {
      link: 'signature',
      label: 'Signature',
      icon: <DriveFileRenameOutlineIcon />,
    },
  ]

  const [pathSelected, setPathSelected] = useState('')

  const onLinkClick = (link) => {
    setPathSelected(link)
    navigate(link)
  }

  return (
    <div>
      <BackButton />
      <Outlet />
      <BottomNav
        tabs={tabs}
        activelink={pathSelected}
        onLinkClick={onLinkClick}
      />
    </div>
  )
}
