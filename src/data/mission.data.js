const missions = [
  {
    index: 0,
    jobId: '2c25faab-0b33-4a25-8db8-95d150eba0bd',
    patient: 'BOURNADET LAUGIER FRANCOISE',
    transportMode: 2,
    transportType: 2,
    transportSens: 1,
    isSerial: false,
    isAck: false,
    schedule: '25/01/2022 12:15:00',
    appointment: '2022-01-20T14:30:00',
    departure: 'EHPAD LES PLEIADES\r\nTOULON\r\n',
    arrival: 'CHU DE NICE HOPITAL PASTEUR\r\nCS DR GIORDONA\r\n',
  },
  {
    index: 1,
    jobId: '174eeeb5-326c-42f1-9e85-ed0ecd804c93',
    patient: 'BONNET ALAIN',
    transportMode: 2,
    transportType: 2,
    transportSens: 1,
    isSerial: false,
    isAck: true,
    schedule: '25/01/2022 12:45:00',
    appointment: '2022-01-10T14:00:00',
    departure: 'DOMICILE\r\nBANDOL\r\n',
    arrival: 'APHM HOPITAL SAINTE MARGUERITE\r\nDENSITO\r\nMARSEILLE\r\n',
  },
  {
    index: 2,
    jobId: 'b4bcd9ab-0cec-4096-80e5-565c3a549517',
    patient: 'DUPRAT MICHELE',
    transportMode: 2,
    transportType: 1,
    transportSens: 1,
    isSerial: false,
    isAck: false,
    schedule: '25/01/2022 13:00:00',
    appointment: '2022-01-20T14:00:00',
    departure: 'DOMICILE\r\nLA VALETTE-DU-VAR\r\n',
    arrival: 'APHM HOPITAL LA TIMONE ADULTES\r\nhospi\r\nMARSEILLE\r\n',
  },
  {
    index: 3,
    jobId: '301cc3e1-2fb0-4e2e-a0eb-0000743dc3be',
    patient: 'GERARDIN FABIENNE',
    transportMode: 3,
    transportType: 2,
    transportSens: 1,
    isSerial: false,
    isAck: true,
    schedule: '25/01/2022 13:30:00',
    appointment: '2022-01-24T14:55:00',
    departure: 'DOMICILE\r\nTOULON\r\n',
    arrival: 'HOPITAL PRIVE CLAIRVAL\r\nRADIOTHERAPIE\r\nMARSEILLE\r\n',
  },
  {
    index: 4,
    jobId: '65ad99c3-673d-4d56-9014-a7b522b2f07b',
    patient: 'BONNET ALAIN',
    transportMode: 2,
    transportType: 2,
    transportSens: 2,
    isSerial: false,
    isAck: false,
    schedule: '25/01/2022 14:15:00',
    appointment: null,
    departure: 'APHM HOPITAL SAINTE MARGUERITE\r\nDENSITO\r\nMARSEILLE\r\n',
    arrival: 'DOMICILE\r\nBANDOL\r\n',
  },
  {
    index: 5,
    jobId: '29cb8ea4-1b2e-4e75-8128-49af8c380ee1',
    patient: 'BOURNADET LAUGIER FRANCOISE',
    transportMode: 2,
    transportType: 2,
    transportSens: 2,
    isSerial: false,
    isAck: false,
    schedule: '25/01/2022 15:30:00',
    appointment: null,
    departure: 'CHU DE NICE HOPITAL PASTEUR\r\nCS DR GIORDONA\r\n',
    arrival: 'EHPAD LES PLEIADES\r\nTOULON\r\n',
  },
  {
    index: 6,
    jobId: 'a743d5b5-c35f-42e7-9f94-89b1c7784ed9',
    patient: 'GERARDIN FABIENNE',
    transportMode: 3,
    transportType: 2,
    transportSens: 2,
    isSerial: false,
    isAck: false,
    schedule: '25/01/2022 16:00:00',
    appointment: null,
    departure: 'HOPITAL PRIVE CLAIRVAL\r\nRADIOTHERAPIE\r\nMARSEILLE\r\n',
    arrival: 'DOMICILE\r\nTOULON\r\n',
  },
]

const mission = {
  Index: 34,
  Patient: 'EL Truc',
  TransportMode: 2,
  TransportType: 3,
  TransportSens: 1,
  IsSerial: false,
  IsAck: false,
  schedule: '0001-01-01T08:15:00',
  Appointment: '2018-06-15T08:45:00',
  Departure: 'DOMICILE\r\nLE PLAN-DE-LA-TOUR\r\n',
  Arrival: 'IME\r\nCOGOLIN\r\n',
}

export { missions, mission }