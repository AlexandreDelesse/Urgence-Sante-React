import React from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getMissionById } from '../../services/mission.service'
import AsyncDataComponent from '../shared/AsyncDataComponent'

export default function MissionDetail() {
  const params = useParams()

  const asyncMissionDetail = useQuery('missionDetail', () =>
    getMissionById(params.missionIndex),
  )

  return (
    <Container>
      <h3 className="text-center m-3">Detail de la mission</h3>
      <AsyncDataComponent
        withRefetchLoader
        data={asyncMissionDetail}
        onSuccess={({ data }) => (
          <div>
            {Object.keys(data).map((el) => (
              <div key={el}>
                {el} : {data[el]}
              </div>
            ))}
          </div>
        )}
      />
    </Container>
  )
}
