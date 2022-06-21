const employees = [
  {
    id: 0,
    name: "frederic",
    secu: "987654321",
    company: "Six four ambulance",
    absences: [
      {
        id: 2,

        from: "2022-06-19T18:34:20.935Z",
        to: "2022-06-26T18:34:20.935Z",
        cause: "flemme",
        isJustified: false,
      },
      {
        id: 3,

        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        cause: "maladie",
        isJustified: true,
      },
    ],
    contrats: [
      {
        id: 1,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
      {
        id: 2,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
      {
        id: 3,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
    ],
  },
  {
    id: 1,
    name: "alexandre",
    secu: "123456789",
    company: "Urgence Sante",
    absences: [
      {
        id: 3,

        from: "2022-06-19T18:34:20.935Z",
        to: "2022-06-26T18:34:20.935Z",
        cause: "flemme",
        isJustified: true,
      },
      {
        id: 2,

        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        cause: "maladie",
        isJustified: false,
      },
    ],
    contrats: [
      {
        id: 1,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
      {
        id: 2,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
      {
        id: 3,
        from: "2022-07-19T18:34:20.935Z",
        to: "2022-07-26T18:34:20.935Z",
        pay: 24000,
      },
    ],
  },
];

export default employees;
