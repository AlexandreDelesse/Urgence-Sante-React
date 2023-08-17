import React, { useEffect } from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getMissions } from '../../services/mission.service'
import AsyncDataComponent from '../shared/AsyncDataComponent'
import DateFormatter from '../shared/DateFormatter'
import TransportType from '../shared/TransportType'
import { BsHandThumbsUpFill } from 'react-icons/bs'
import './mission.css'
import { transportModeEnum } from '../../data/enum.data'

export default function MissionList() {
  const navigate = useNavigate()

  const asyncMissions = useQuery('missions', getMissions)
  const queryClient = useQueryClient()

  const onMissionClick = (missionIndex) => {
    navigate(`/mission/${missionIndex}`)
  }

  const onButtonClick = (e) => {
    e.stopPropagation()
    queryClient.invalidateQueries('missions')
  }

  useEffect(() => {
    console.log(asyncMissions)
  }, [asyncMissions])

  return (
    <AsyncDataComponent
      data={asyncMissions}
      onLoadingMessage="Chargement des missions..."
      onSuccess={({ data }) => (
        <div>
          {data.length === 0 ? (
            <div>Pas de missions</div>
          ) : (
            <div>
              {data.map((el) => (
                <Card key={el.index} className="my-3">
                  <Card.Body onClick={() => onMissionClick(el.jobId)}>
                    <div className="d-flex fs-5">
                      <DateFormatter dateSpecial={el.schedule} />
                    </div>
                    <span>{transportModeEnum[el.transportMode]}</span>
                    <div className="fw-bold">{el.patient}</div>
                    <div>
                      Rdv :
                      {el.appointment ? (
                        <DateFormatter dateToParse={el.appointment} />
                      ) : (
                        'Pas de rdv'
                      )}
                    </div>
                    <div>
                      <span className="fw-bold">Départ : </span>
                      {el.departure}
                    </div>
                    <div>
                      <span className="fw-bold">Arrivée : </span>
                      {el.arrival}
                    </div>
                    <div>
                      <TransportType transportType={el.transportType} />
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end">
                    {el.isAck ? (
                      <img
                        className="ms-3 align-middle"
                        style={{ height: '32px' }}
                        src={require('../../assets/ambulance.gif')}
                        alt="loading..."
                      />
                    ) : (
                      <Button
                        onClick={onButtonClick}
                        size="sm"
                        variant="success"
                      >
                        Accepter <BsHandThumbsUpFill size={12} />
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              ))}
            </div>
            // <ListGroup variant="flush">
            //   {data.map((el) => (
            //     <ListGroupItem
            //       key={el.index}
            //       onClick={() => onMissionClick(el.index)}
            //       className="d-flex justify-content-between"
            //     >
            //       <div className="d-flex flex-column">
            //         <div className="fs-5">
            //           <DateFormatter dateSpecial={el.schedule} />
            //         </div>
            // <span>{el.transportMode}</span>
            // <div className="fw-bold">{el.patient}</div>
            // <div>
            //   Rdv :{' '}
            //   {el.appointment ? (
            //     <DateFormatter dateToParse={el.appointment} />
            //   ) : (
            //     'Pas de rdv'
            //   )}
            // </div>
            // <div>
            //   <span className="fw-bold">Départ :</span>
            //   {el.departure}
            // </div>
            // <div>
            //   <span className="fw-bold">Arrivée :</span>
            //   {el.arrival}
            // </div>
            // <div>
            //   <TransportType transportType={el.transportType} />
            // </div>
            //       </div>
            //       <Button  className='h-25' onClick={onButtonClick} size="sm" variant="success">
            //         <BsHandThumbsUp size={30} />
            //       </Button>
            //     </ListGroupItem>
            //   ))}
            // </ListGroup>
          )}
        </div>
      )}
    ></AsyncDataComponent>
  )
}
