export interface GetLoginDTO {
  crewId: number
  token: string
  label: string
  member1: string | null
  member2: string | null
  immat: string
  start: string
  end: string
}
