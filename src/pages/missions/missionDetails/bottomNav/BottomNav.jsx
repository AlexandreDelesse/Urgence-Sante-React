import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";

export default function BottomNav({ tabs, activelink, onLinkClick }) {
  return (
    <Paper
      sx={{
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value="Mission">
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.link}
            className={activelink === tab.link ? "Mui-selected" : ""}
            onClick={() => onLinkClick(tab.link)}
            label={tab.label}
            icon={tab.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
