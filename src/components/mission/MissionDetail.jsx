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
      <h2 className="text-center">Detail de la mission</h2>
      <AsyncDataComponent
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
