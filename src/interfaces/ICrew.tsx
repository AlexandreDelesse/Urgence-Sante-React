interface ICrew {
  crewId: number;
  token?: string;
  label: string;
  member1: string;
  member2?: string;
  immat: string;
  start: Date;
  end?: Date;
}

export type { ICrew };
