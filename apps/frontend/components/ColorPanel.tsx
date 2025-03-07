import { Colors, lineWidth } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorPanelProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  lineWidth: lineWidth;
  setLineWidth: (value: lineWidth) => void;
}

export const ColorPanel = ({
  selectedColor,
  setSelectedColor,
  lineWidth,
  setLineWidth,
}: ColorPanelProps) => {
  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col items-center bg-[#222328] p-3 rounded-lg shadow-lg z-50 border border-gray-700">
      {/* Color Picker Section */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-300 font-medium">Color</p>
        <div className="grid grid-cols-2 gap-2">
          {Colors.map((color) => (
            <button
              key={color}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                selectedColor === color
                  ? "border-white scale-110"
                  : "border-gray-600"
              )}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-500 my-3"></div>

      {/* Stroke Width Section */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-300 font-medium">Stroke</p>
        <div className="flex flex-col gap-2">
          {[1, 2, 4, 5, 10].map((size) => (
            <button
              key={size}
              className={cn(
                "w-10 h-6 flex items-center justify-center bg-gray-700 text-white rounded-md text-sm transition-all hover:bg-gray-600",
                lineWidth === size ? "bg-gray-500 scale-110" : ""
              )}
              onClick={() => setLineWidth(size as lineWidth)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
