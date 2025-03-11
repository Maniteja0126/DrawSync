import { HTTP_BACKEND } from "@/lib/config";
import axios from "axios";



export async function getCanvasShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/room/chats/${roomId}`);

  const messages = res.data.chats || []; 


  const shapes = messages
    .map((x: { chatMessage?: string }) => {
      if (!x.chatMessage) return null; 
      try {
        const messageData = JSON.parse(x.chatMessage);
        return messageData.shapes; 
      } catch (error) {
        console.error("JSON Parse Error:", error, "Data:", x.chatMessage);
        return null;
      }
    })
    .filter(Boolean); 

  return shapes;
}
