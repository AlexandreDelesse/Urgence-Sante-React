import { Box, Button, Skeleton } from "@mui/material";
import { TbSteeringWheel } from "react-icons/tb";
import DriverSwapViewModel from "../viewModel/DriverSwapViewModel";

export default function DriverSwapView() {
  const {
    driverSelected,
    isLoading,
    isError,
    selectNextDriver,
    lastTimeSwap,
    updateError,
  } = DriverSwapViewModel();

  if (isError || updateError)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 50,
        }}
        bgcolor="lightgrey"
      >
        <span>Erreur de chauffeur</span>
      </Box>
    );

  if (!driverSelected)
    return <Skeleton variant="rectangular" height={50} width="100%" />;

  return (
    <Button
      disabled={isLoading}
      onClick={selectNextDriver}
      size="large"
      variant="contained"
      color="primary"
      startIcon={<TbSteeringWheel size={20} />}
      fullWidth
    >
      {isLoading ||
        `${driverSelected.driverName} - ${lastTimeSwap}` ||
        "Erreur chauffeur"}
    </Button>
  );
}
