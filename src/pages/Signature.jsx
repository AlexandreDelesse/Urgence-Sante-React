import React, { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import "./signature.css";

export default function Signature() {
  const canvasRef = useRef();
  const [signatureData, setSignatureData] = useState("");
  const [canvasImg, setCanvasImg] = useState(null);
  const onSubmitClick = () => {
    setCanvasImg(canvasRef.current.getTrimmedCanvas().toDataURL("image/png"));
  };
  const canvasProps = {
    width: 320,
    height: 200,
    className: "sigPad",
  };
  return (
    <div className="pageContainer">
      <h1 className="text-center">Signature</h1>
      <div className="sigContainer">
        <div>
          <SignatureCanvas
            ref={canvasRef}
            penColor="green"
            canvasProps={canvasProps}
          />
        </div>
        <div>
          <Button
            onClick={() => canvasRef.current.clear()}
            variant="secondary"
            className="me-2"
          >
            Recommencer
          </Button>
          <Button onClick={onSubmitClick}>Envoyer</Button>
        </div>
      </div>
      <p className="mt-3">Votre signature : </p>
      {canvasImg ? <img src={canvasImg} alt="" /> : null}
    </div>
  );
}
