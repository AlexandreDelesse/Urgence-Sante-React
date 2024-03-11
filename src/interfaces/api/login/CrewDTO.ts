export interface CrewDTO {
  crewId: number
  token: string | null
  label: string
  member1: string
  member2?: string
  immat: string
  start: Date
  end?: Date
  tokenPeremption?: string
}
