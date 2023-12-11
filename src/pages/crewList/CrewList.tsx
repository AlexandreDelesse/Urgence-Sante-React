import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllCrews } from '../../services/crew.service'
import AsyncDataComponent from '../../components/shared/AsyncDataComponent'
import CrewCard from './crewCard/CrewCard'
import './crewList.css'
import UserContext from '../../contexts/User.context'
import CrewListLogin from './crewListLogin/CrewListLogin'
import CrewListFilters from './crewListFilters/CrewListFilters'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ICrew } from '../../interfaces/ICrew'

export default function CrewList() {
  const crewsQuery = useQuery('crews', getAllCrews)
  const userContext = useContext(UserContext)

  interface IFilter {
    searchValue: string
  }

  const [filters, setFilters] = useState<IFilter>({ searchValue: '' })

  //FIXME: A refaire propre.
  const dataFilter = (crews: ICrew[], filters: IFilter) => {
    if (!crews) return []
    return crews.filter(
      (crew) =>
        !filters.searchValue ||
        (crew.member1
          ? crew.member1
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.member2
          ? crew.member2
              .toLowerCase()
              .includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.immat
          ? crew.immat.toLowerCase().includes(filters.searchValue.toLowerCase())
          : false) ||
        (crew.label
          ? crew.label.toLowerCase().includes(filters.searchValue.toLowerCase())
          : false),
    )
  }

  const navigate = useNavigate()

  const navigateTologin = (crewId: string, code: number) => {
    if (!crewId || !code) return
    navigate(`/login/${code}&${crewId}`)
  }

  if (!userContext.hasLogged) return <CrewListLogin />

  return (
    <Container>
      <CrewListFilters filters={filters} setFilters={setFilters} />

      <AsyncDataComponent
        data={crewsQuery}
        onSuccess={({ data }: any) => (
          <div className="crewList">
            {dataFilter(data, filters).map((crew, index) => (
              <CrewCard key={index} crew={crew} onClick={navigateTologin} />
            ))}
          </div>
        )}
      />
    </Container>
  )
}
