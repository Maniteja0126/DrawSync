// "use client";

// import { HTTP_BACKEND } from "@/lib/config";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { Input } from "@repo/ui/input";
// import { Button } from "./ui/Button";

// export const CreateRoom = () => {
//   const [roomName, setRoomName] = useState("");
//   const router = useRouter();

//   const handleCreateRoom = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem("AuthToken");
//     try {
//       const response = await axios.post(
//         `${HTTP_BACKEND}/room`,
//         { name: roomName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//         }
//       );
//       const roomId = response.data.roomId;
//       toast.success("Room Created");
//       router.push(`/canvas/${roomId}`);
//     } catch (error) {
//       console.error("Error from create Room", error);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg w-80">
//         <h2 className="text-xl font-bold mb-4">Create a Room</h2>

//         <form onSubmit={handleCreateRoom} className="w-full">
//           <Input
//             type="text"
//             placeholder="Enter room name"
//             value={roomName}
//             onChange={(e) => setRoomName(e.target.value)}
//             className="w-full p-2 mb-3 text-white rounded-md"
//             required
//           />
//           <Button
//             type="submit"
//             className="w-full p-2 bg-blue-500  hover:bg-blue-600 rounded-md disabled:bg-gray-500"
//           >
//             Create Room
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };




"use client";

import { HTTP_BACKEND } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@repo/ui/input";
import { Button } from "./ui/Button";

export const CreateOrJoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false); // Toggle between Create & Join Room
  const router = useRouter();

  // Function to create a new room
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("AuthToken");

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
      toast.success("Room Created!");
      router.push(`/canvas/${newRoomId}`); // Navigate to the created room
    } catch (error) {
      console.error("Error creating room", error);
      toast.error("Failed to create room");
    }
  };

  // Function to join an existing room
  const handleJoinRoom = () => {
    if (roomId.trim() === "") {
      toast.error("Please enter a valid Room ID");
      return;
    }
    router.push(`/canvas/${roomId}`); // Navigate to the entered room
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {isJoining ? "Join a Room" : "Create a Room"}
        </h2>

        {/* Create Room UI */}
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

        {/* Join Room UI */}
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

        {/* Toggle Button */}
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
