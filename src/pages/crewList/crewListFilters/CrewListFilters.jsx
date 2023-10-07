import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function CrewListFilters({ filters, setFilters }) {
  const handleSearchChanges = (value) => {
    setFilters((old) => ({ ...old, ["searchValue"]: value.eQ_LIBELLE }));
  };

  return <div>Filters</div>;
}
