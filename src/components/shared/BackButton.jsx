import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <span
      role="button"
      onClick={() => navigate(-1)}
      className="d-flex justify-content-start align-items-center mt-3 cusor-pointer"
    >
      <IoIosArrowBack /> Retour
    </span>
  )
}
