import { Button } from "./ui/Button";
import {
  Circle,
  Move,
  MoveRight,
  Pencil,
  Square,
  SquareDashed,
  Trash2,
} from "lucide-react";

import { lineWidth } from "@/lib/types";
import { ColorPanel } from "./ColorPanel";
import { useSelectedTool } from "@/store/store";

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void | undefined;
  lineWidth: lineWidth;
  setLineWidth: (lineWidth: lineWidth) => void;
}

export const ToolBar = ({
  setColor,
  color,
  lineWidth,
  setLineWidth,
}: ToolbarProps) => {
  const { selectedTool, setSelectedTool } = useSelectedTool();
  return (
    <div className="fixed top-10 left-30 right-30 bg-[rgb(34,35,40)] shadow-sm p-4 flex items-center gap-2 z-10 text-white rounded-md">
      <div className="flex items-center gap-2 border-r pr-4">
        <Button
          className={`${selectedTool === "rectangle" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "rectangle" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("rectangle")}
        >
          <Square size={4} />
        </Button>
        <Button
          className={`${selectedTool === "circle" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "circle" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("circle")}
        >
          <Circle size={4} />
        </Button>
        <Button
          className={`${selectedTool === "line" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "line" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("line")}
        >
          <MoveRight size={4} />
        </Button>
        <Button
          className={`${selectedTool === "pencil" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "pencil" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("pencil")}
        >
          <Pencil size={4} />
        </Button>
      </div>
      <div className="flex items-center gap-2 pr-4">
        <Button
          className={`${selectedTool === "move" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "move" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("move")}
        >
          <Move size={4} />
        </Button>
        <Button
          className={`${selectedTool === "delete" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "delete" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("delete")}
        >
          <Trash2 size={4} />
        </Button>
        <Button
          className={`${selectedTool === "select" ? "bg-slate-700" : "bg-transparent"}`}
          variant={selectedTool === "select" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("select")}
        >
          <SquareDashed size={4} />
        </Button>
      </div>
      <div className="flex  items-center gap-2">
        <ColorPanel
          selectedColor={color}
          setSelectedColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
      </div>
    </div>
  );
};
