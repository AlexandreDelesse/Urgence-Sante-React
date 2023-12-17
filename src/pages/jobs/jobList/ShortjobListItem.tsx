import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IShortJob } from "../../../interfaces/shortJob/IShortJob";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FlagIcon from "@mui/icons-material/Flag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TransportMode from "../../missions/missionList/missionListItem/transportMode/TransportMode";
import TransportSens from "../../missions/missionList/missionListItem/transportSens/TransportSens";
import { Spinner } from "react-bootstrap";

interface IShortjobListItem {
  shortJob: IShortJob;
  onAck: (jobId: string) => void;
  onGoDetail: (jobId: string) => void;
  isAckLoading: boolean;
}

export default function ShortjobListItem({
  shortJob,
  onAck,
  onGoDetail,
  isAckLoading,
}: IShortjobListItem) {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => setExpand((old) => !old);

  const handleOnAck = () => {
    onAck(shortJob.jobId);
  };

  const handleOnGoDetail = () => {
    onGoDetail(shortJob.jobId);
  };

  //FIXME: Gerer le spacing dans un composant list et pas sur la carte.
  return (
    <Card className="my-2" elevation={0}>
      <CardActionArea sx={{ paddingX: 0 }} onClick={toggleExpand}>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "4px 1fr", padding: 1 }}
        >
          <Box
            sx={{
              paddingY: 0,
              backgroundColor: shortJob.isAck ? "#479f76" : "#ffcd39",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 1,
              ":last-child": { padding: 0 },
            }}
          >
            <div>
              <Typography variant="body1">{shortJob.patient}</Typography>

              <Typography>
                <TransportMode mode={shortJob.transportMode} /> -{" "}
                <TransportSens sens={shortJob.transportSens} />
              </Typography>
              <Typography variant="button" color="primary">
                {shortJob.schedule}
              </Typography>
            </div>

            {expand ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            {/* <Box sx={{ position: 'absolute', top: '8px', right: '8px' }}>
            <HourglassBottomIcon color="warning" fontSize='small'/>
          </Box> */}
          </CardContent>
        </Box>
      </CardActionArea>
      <Collapse unmountOnExit in={expand}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* <Typography variant="caption">Départ</Typography> */}
            <FlagIcon color="warning" /> {shortJob.departure}
            <Typography variant="body1"></Typography>
          </Box>

          <Divider variant="middle" sx={{ marginY: 2 }} />

          <Box sx={{ display: "flex", gap: 1 }}>
            {/* <Typography variant="caption">Départ</Typography> */}
            <SportsScoreIcon color="success" /> {shortJob.arrival}
            <Typography variant="body1"></Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex" }}>
          <>
            {shortJob.isAck || (
              <Button
                sx={{ width: "100%" }}
                startIcon={
                  isAckLoading ? (
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                  ) : (
                    <ThumbUpIcon />
                  )
                }
                variant="contained"
                color="success"
                onClick={handleOnAck}
              >
                Ok !
              </Button>
            )}
            <Button
              sx={{ width: "100%" }}
              startIcon={<VisibilityIcon />}
              variant="contained"
              onClick={handleOnGoDetail}
            >
              Détail
            </Button>
          </>
        </CardActions>
      </Collapse>
    </Card>
  );
}
