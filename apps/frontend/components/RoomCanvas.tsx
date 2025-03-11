"use client";

import { WS_BACKEND_URL } from "@/lib/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    if (authToken) {
      const ws = new WebSocket(`${WS_BACKEND_URL}?token=${authToken}`);
      ws.onopen = () => {
        setSocket(ws);
        const data = JSON.stringify({
          type: "join_room",
          roomId,
        });
        ws.send(data);
      };

      return () => {
        ws.close();
      };
    }
  }, [authToken, roomId]);

  if (!socket) {
    return (
      <div className="flex justify-center align-middle">
        Connecting to server ....
      </div>
    );
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
