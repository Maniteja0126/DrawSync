"use client"

import { WS_BACKEND_URL } from "@/lib/config";
import { useEffect, useState } from "react";
import { Canvas } from './Canvas';

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    setAuthToken(token);  
    console.log("token ", token);
  }, []);

  useEffect(() => {
    if (authToken) {
      console.log("Socket " , WS_BACKEND_URL);
      const ws = new WebSocket(`ws://localhost:8080?token=${authToken}`);
      ws.onopen = () => {
        setSocket(ws);
        const data = JSON.stringify({
          type: "join_room",
          roomId,
        });
        console.log(data);
        ws.send(data);
      };

      return () => {
        ws.close();
      };
    }
  }, [authToken, roomId]);

  if (!socket) {
    return <div>Connecting to server ....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
