import React, { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  getSignature,
  putSignature,
} from "../../../../services/mission.service";
import ReactSignatureCanvas from "react-signature-canvas";
import { Button, Card } from "@mui/material";
import "./signature.css";
import AsyncDataComponent from "../../../../components/shared/AsyncDataComponent";

export default function Signature({ jobId }) {
  const signatureQuery = useQuery("signature", () => getSignature(jobId));
  const queryClient = useQueryClient();

  const [sign, setSign] = useState();

  const handleClear = () => {
    sign.clear();
  };

  const encodeSignature = async () => {
    const imgGenerated = sign.getTrimmedCanvas().toDataURL();
    await putSignature({
      jobId,
      data: imgGenerated,
      dateTime: new Date().toISOString(),
    });
    queryClient.invalidateQueries("signature");
  };

  return (
    <>
      <AsyncDataComponent
        data={signatureQuery}
        onSuccess={({ data }) => (
          <Card
            sx={{ backgroundImage: `url(${data.data})` }}
            className="mt-3 imgContainer"
          />
        )}
        onError={() => (
          <>
            <Card className="cardCanvas">
              <ReactSignatureCanvas
                penColor="blue"
                canvasProps={{ className: "sigCanvas" }}
                ref={(data) => setSign(data)}
              />
            </Card>
            <div className="mt-3">
              <Button
                variant="contained"
                color="success"
                onClick={encodeSignature}
              >
                Envoyer
              </Button>
              <Button color="secondary" onClick={handleClear}>
                Effacer
              </Button>
            </div>
          </>
        )}
      />
    </>
  );
}
