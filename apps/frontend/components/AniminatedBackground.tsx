import { Square, Circle, Triangle } from "lucide-react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full animate-float"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-500/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/3 w-32 h-32 bg-green-500/20 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="absolute top-20 right-1/4 animate-spin-slow">
        <Square className="w-12 h-12 text-blue-500/30" />
      </div>
      <div
        className="absolute bottom-1/4 left-20 animate-spin-slow"
        style={{ animationDelay: "2s" }}
      >
        <Triangle className="w-12 h-12 text-purple-500/30" />
      </div>
      <div
        className="absolute top-1/3 left-1/4 animate-spin-slow"
        style={{ animationDelay: "4s" }}
      >
        <Circle className="w-8 h-8 text-green-500/30" />
      </div>
    </div>
  );
}
