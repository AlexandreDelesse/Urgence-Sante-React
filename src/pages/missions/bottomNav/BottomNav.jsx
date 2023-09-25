import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import InfoIcon from "@mui/icons-material/Info";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function BottomNav({ activelink, onLinkClick }) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value="Detail">
        <BottomNavigationAction
          className={activelink === "details" ? "Mui-selected" : ""}
          onClick={() => onLinkClick("details")}
          label="Detail"
          icon={<InfoIcon />}
        />
        <BottomNavigationAction
          className={activelink === "other" ? "Mui-selected" : ""}
          onClick={() => onLinkClick("other")}
          label="Autre"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          className={activelink === "signature" ? "Mui-selected" : ""}
          disabled={true}
          onClick={() => onLinkClick("signature")}
          label="Signature"
          icon={<DriveFileRenameOutlineIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
