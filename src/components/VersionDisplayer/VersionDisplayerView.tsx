import React from "react";
import packageJson from "../../../package.json";
import { Box } from "@mui/material";

export default function VersionDisplayerView() {
  return <Box sx={{ padding: 2 }}>version {packageJson.version}</Box>;
}
