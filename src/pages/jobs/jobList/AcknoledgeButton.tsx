import { Button, CircularProgress } from "@mui/material";
import useAckJobMutation from "../../../hooks/mutation/useAckJobMutation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface AcknoledgeButtonProps {
  jobId: string;
}

export default function AcknoledgeButton(props: AcknoledgeButtonProps) {
  const { jobId } = props;
  const ackMutation = useAckJobMutation();

  const isLoading =
    ackMutation.variables?.jobId === jobId && ackMutation.isLoading;

  const handleOnAck = () => ackMutation.mutate({ jobId });

  return (
    <Button
      sx={{ width: "100%" }}
      startIcon={
        isLoading ? (
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
  );
}
