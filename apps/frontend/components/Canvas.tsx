"use client";
import { useEffect, useRef, useState } from "react";
import { Game } from "@/draw//game";
import { ToolBar } from "./ToolBar";
import { colorOptions, lineWidth } from "@/lib/types";
import DownloadCanvas from "./DownloadCanvas";
import { cn } from "@/lib/utils";
import { useSelectedTool } from "@/store/store";

export const Canvas = ({ roomId, socket }: { roomId: string; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<Game>();

  const [color, setSelectedColor] = useState<colorOptions>("#FFFFFF");
  const [lineWidth, setLineWidth] = useState<lineWidth>(1);
  const { selectedTool, setSelectedTool } = useSelectedTool();

  useEffect(() => {
    game?.setSelectedColor(color);
    game?.setSelectedTool(selectedTool);
    game?.setLineWidth(lineWidth);
  }, [color, selectedTool, lineWidth, game]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const g = new Game(canvas, roomId, socket);
    setGame(g);
    return () => {
      g.destroy();
    };
  }, [roomId, socket]);

  return (
    <div className=" min-h-screen flex flex-col items-center">
      <DownloadCanvas canvasRef={canvasRef} />
      <ToolBar
        color={color}
        setColor={setSelectedColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "block m-auto bg-[rgb(19,22,29)]",
          selectedTool === "move" ? "cursor-move" : " cursor-crosshair",
          selectedTool === "delete" ? "cursor-pointer" : ""
        )}
        onMouseUp={() => {
          setSelectedTool("move");
        }}
      />
    </div>
  );
};


