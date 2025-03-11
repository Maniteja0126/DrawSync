"use client";

import { HTTP_BACKEND } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@repo/ui/input";
import { Button } from "./ui/Button";
import { AnimatedBackground } from "./AniminatedBackground";

export const CreateOrJoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    if (!authToken) {
      toast.error("Please login first");
      router.push("/signin");
    } else {
      setToken(authToken);
    }
  }, [router]); 

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return; 

    try {
      const response = await axios.post(
        `${HTTP_BACKEND}/room`,
        { name: roomName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const newRoomId = response.data.roomId;
      toast.success(`Room Created! Room ID: ${newRoomId}`);
      router.push(`/canvas/${newRoomId}`);
    } catch (error) {
      console.error("Error creating room", error);
      toast.error("Failed to create room");
    }
  };

  const handleJoinRoom = () => {
    if (roomId.trim() === "") {
      toast.error("Please enter a valid Room ID");
      return;
    }
    router.push(`/canvas/${roomId}`);
  };
  if (!token) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <AnimatedBackground />
      <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {isJoining ? "Join a Room" : "Create a Room"}
        </h2>

        {!isJoining && (
          <form onSubmit={handleCreateRoom} className="w-full">
            <Input
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full p-2 mb-3 text-white rounded-md"
              required
            />
            <Button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded-md disabled:bg-gray-500"
            >
              Create Room
            </Button>
          </form>
        )}

        {isJoining && (
          <div className="w-full">
            <Input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-2 mb-3 text-white rounded-md"
              required
            />
            <Button
              onClick={handleJoinRoom}
              className="w-full p-2 bg-green-500 hover:bg-green-600 rounded-md"
            >
              Join Room
            </Button>
          </div>
        )}

        <Button
          onClick={() => setIsJoining(!isJoining)}
          className="mt-4 text-sm text-gray-300 hover:underline"
        >
          {isJoining ? "Create a new room" : "Join an existing room"}
        </Button>
      </div>
    </div>
  );
};
