"use client";

import React from "react";
import { Button } from "./ui/Button";

const DownloadCanvas = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) => {
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = url;
    link.click();
  };
  return (
    <div className="fixed top-12 right-10 z-10 p-2 bg-blue-500 shadow-sm rounded-md">
      <Button variant={"secondary"} size={"lg"} onClick={downloadCanvas}>
        Download
      </Button>
    </div>
  );
};

export default DownloadCanvas;