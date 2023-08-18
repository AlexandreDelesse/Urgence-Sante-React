import React, { useEffect } from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useQuery, useQueryClient } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { acceptMission, getMissions } from '../../services/mission.service'
import AsyncDataComponent from '../shared/AsyncDataComponent'
import DateFormatter from '../shared/DateFormatter'
import TransportType from '../shared/TransportType'
import { BsCheck2Square } from 'react-icons/bs'
import './mission.css'
import { transportModeEnum } from '../../data/enum.data'

export default function MissionList() {
  const navigate = useNavigate()

  const asyncMissions = useQuery('missions', getMissions)
  const queryClient = useQueryClient()

  const onMissionClick = (missionIndex) => {
    navigate(`/jobdetail/${missionIndex}`)
  }

  const onButtonClick = async (e, jobId) => {
    e.stopPropagation()
    await acceptMission(jobId)
    queryClient.invalidateQueries('missions')
  }

  useEffect(() => {
    console.log(asyncMissions)
  }, [asyncMissions])

  return (
    <AsyncDataComponent
      data={asyncMissions}
      onLoadingMessage="Chargement des missions.."
      onSuccess={({ data }) => (
        <div className="mt-3">
          {data.length === 0 ? (
            <div>Pas de missions</div>
          ) : (
            <div>
              <ListGroup variant="flush">
                {data.map((el) => (
                  <ListGroupItem
                    key={el.index}
                    onClick={() => onMissionClick(el.jobId)}
                    className="d-flex justify-content-between px-0"
                  >
                    <div className="job-item w-100">
                      <span
                        className={el.isAck ? 'bg-success' : 'bg-warning'}
                      />
                      <div className="d-flex flex-column ms-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <div>{el.schedule}</div>
                          </div>
                          {el.isAck || (
                            <Button
                              size="sm"
                              onClick={(e) => onButtonClick(e, el.jobId)}
                              variant="success"
                            >
                              Accepter <BsCheck2Square size={16} />
                            </Button>
                          )}
                        </div>
                        <span>{transportModeEnum[el.transportMode]}</span>
                        <div className="fw-bold">{el.patient}</div>
                        <div>Rdv : {el.appointment || 'Pas de rdv'}</div>
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
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          )}
        </div>
      )}
      onError={() => <Navigate to="login" />}
    ></AsyncDataComponent>
  )
}
