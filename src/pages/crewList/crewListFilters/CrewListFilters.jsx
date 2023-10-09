import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";

export default function CrewListFilters({ filters, setFilters }) {
  const handleSearchChanges = (e) => {
    const { value, name } = e.target;
    setFilters((old) => ({ ...old, [name]: value }));
  };

  return (
    <Row className="my-4">
      <Col>
        <FormControl
          value={filters.searchValue || ""}
          onChange={handleSearchChanges}
          name="searchValue"
          placeholder="Rechercher"
        />
      </Col>
    </Row>
  );
}
