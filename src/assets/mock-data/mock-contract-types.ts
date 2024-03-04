import { ContractType } from "../../models/ContractType";

export const CONTRACT_TYPES: ContractType[] = [
  {
    id: 1,
    name: "PSL",
    hasPmt: false,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
  {
    id: 2,
    name: "Autre",
    hasPmt: false,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
  {
    id: 3,
    name: "CPAM",
    hasPmt: true,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
  {
    id: 4,
    name: "Centre 15",
    hasPmt: false,
    hasReference: true,
    referenceLabel: "N° Centaure",
    values: [],
  },
  {
    id: 5,
    name: "Art. 80",
    hasPmt: true,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
  {
    id: 6,
    name: "SMUR",
    hasPmt: false,
    hasReference: true,
    referenceLabel: "Smur de",
    values: [
      "Briançon",
      "Gap",
      "La Ciotat",
      "Toulon",
      "Hyères",
      "Gassin",
      "Brignoles",
      "Darguignan",
      "Frejus",
      "Cannes",
      "Autre",
    ],
  },
  {
    id: 7,
    name: "Assistance",
    hasPmt: false,
    hasReference: true,
    referenceLabel: "N° Dossier",
    values: [
      "IMA",
      "AXA",
      "Europe",
      "Mondiale",
      "Fidelia",
      "Mutuaide",
      "ACTA",
      "CNAS",
      "Autre",
    ],
  },
  {
    id: 8,
    name: "Présence Verte",
    hasPmt: false,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
  {
    id: 9,
    name: "Particulier",
    hasPmt: false,
    hasReference: false,
    referenceLabel: null,
    values: [],
  },
];