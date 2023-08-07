import React, { useEffect } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getMissions } from '../../services/mission.service'
import AsyncDataComponent from '../shared/AsyncDataComponent'
import DateFormatter from '../shared/DateFormatter'
import TransportType from '../shared/TransportType'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import './mission.css'

export default function MissionList() {
  const navigate = useNavigate()

  const asyncMissions = useQuery('missions', getMissions)
  const queryClient = useQueryClient()

  // const missions = []
  const onMissionClick = (missionIndex) => {
    navigate(`/mission/${missionIndex}`)
  }

  const onButtonClick = (e) => {
    e.stopPropagation()
    queryClient.invalidateQueries('missions')
  }
  return (
    <AsyncDataComponent
      data={asyncMissions}
      onSuccess={({ data }) => (
        <div>
          {data.length === 0 ? (
            <div>Pas de missions</div>
          ) : (
            <ListGroup variant="flush">
              {data.map((el) => (
                <ListGroupItem
                  key={el.index}
                  onClick={() => onMissionClick(el.index)}
                  className="d-flex justify-content-between"
                >
                  <div className="d-flex flex-column">
                    <div className="fs-5">
                      <DateFormatter dateSpecial={el.schedule} />
                    </div>
                    <span>{el.transportMode}</span>
                    <div className="fw-bold">{el.patient}</div>
                    <div>
                      Rdv :{' '}
                      {el.appointment ? (
                        <DateFormatter dateToParse={el.appointment} />
                      ) : (
                        'Pas de rdv'
                      )}
                    </div>
                    <div>
                      <span className="fw-bold">Départ :</span>
                      {el.departure}
                    </div>
                    <div>
                      <span className="fw-bold">Arrivée :</span>
                      {el.arrival}
                    </div>
                    <div>
                      <TransportType transportType={el.transportType} />
                    </div>
                  </div>
                  <Button className='h-25' onClick={onButtonClick} size="sm" variant="outline-success">
                    <AiOutlineCheckCircle size={30} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </div>
      )}
    ></AsyncDataComponent>
  )
}
