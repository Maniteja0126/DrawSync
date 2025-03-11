// import "./config.js";

// import { WebSocket, WebSocketServer } from "ws";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET, TOPIC, redisURL } from "./config.js";
// import { createClient } from "redis";
// import  prismaClient  from "@repo/db/client";

// class WebSocketSingleton {
//   private static instance: WebSocketServer;

//   public static getInstance(): WebSocketServer {
//     if (!WebSocketSingleton.instance) {
//       WebSocketSingleton.instance = new WebSocketServer({ port: 8080 });
//     }
//     return WebSocketSingleton.instance;
//   }
// }

// const wss = WebSocketSingleton.getInstance();

// const redisClient = createClient({ url: redisURL });
// const subscriber = createClient({ url: redisURL });

// (async () => {
//   try {
//     await Promise.all([redisClient.connect() , subscriber.connect()]);
//     console.log("Connected to Redis");
//   } catch (err) {
//     console.error("Redis connection error:", err);
//   }
// })();

// redisClient.on("error", (err) => console.error("Redis Client Error", err));
// subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));

// interface User {
//   ws: WebSocket;
//   rooms: string[];
//   userId: string;
// }

// const users: User[] = [];

// async function checkUser(token: string): Promise<string | null> {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET as string);
//     return typeof decoded === "string" || !decoded?.userId ? null : decoded.userId;
//   } catch (e) {
//     return null;
//   }
// }

// wss.on("connection", async function connection(ws, request) {
//   const url = request.url;
//   if (!url) return;

//   const queryParams = new URLSearchParams(url.split("?")[1]);
//   const token = queryParams.get("token") || "";
//   const userId = await checkUser(token);

//   if (!userId) {
//     ws.close();
//     return;
//   }

//   const user: User = { userId, rooms: [], ws };
//   users.push(user);

//   ws.on("message", async (message) => {
//     let parsedData: any;
//     try {
//       parsedData = JSON.parse(typeof message === "string" ? message : message.toString());
//     } catch (err) {
//       return;
//     }

//     const { type, roomId, message: chatMessage, shape, shapeIndex, deleteIndex, shapeId } = parsedData;

//     switch (type) {
//       case "join_room":
//         user.rooms.push(roomId);

//         const previousMessages = await redisClient.xRange(TOPIC , "-" , "+");

//         const roomMessages = previousMessages.map(({message}) => message).filter((msg) => msg.roomId === roomId);

//         if (roomMessages.length > 0){
//           ws.send(JSON.stringify({type:"previous_messages" , messages : roomMessages}))
//         }


//         break;

//       case "leave_room":
//         user.rooms = user.rooms.filter((id) => id !== roomId);
//         break;


//       case "chat":
//         const messageData = {
//           roomId,
//           message: chatMessage,
//           userId,
//         };

//         // console.log("Adding to Redis Stream:", messageData);

//         await redisClient.xAdd(TOPIC, "*", messageData);

//         broadcastToRoom(roomId, { type: "chat", roomId, chatMessage });
//         break;

//       case "move_shape":
//         broadcastToRoom(roomId, { type: "move_shape", roomId, shape, shapeIndex });
//         break;

//       case "delete_shape":
//         broadcastToRoom(roomId, { type: "delete_shape", roomId, deleteIndex });
//         break;

//       case "delete_shape_by_id":
//         broadcastToRoom(roomId, { type: "delete_shape_by_id", roomId, shapeId });
//         break;
//     }
//   });

//   ws.on("close", () => removeUser(ws));
//   ws.on("error", () => removeUser(ws));
// });

// function broadcastToRoom(roomId: string, message: object) {
//   users.forEach((user) => {
//     if (user.rooms.includes(roomId)) {
//       user.ws.send(JSON.stringify(message));
//     }
//   });
// }

// function removeUser(ws: WebSocket) {
//   const userIndex = users.findIndex((user) => user.ws === ws);
//   if (userIndex !== -1) {
//     users.splice(userIndex, 1);
//   }
// }



// async function processMessages() {
//   // console.log(" Redis Subscriber is listening for messages...");

//   while (true) {
//     try {
//       // console.log("Waiting for messages...");
//       const data = await subscriber.xRead(
//         [{ key: TOPIC, id: "0" }], 
//         { BLOCK: 5000 }
//       );

//       // console.log("xRead() returned:", JSON.stringify(data, null, 2));

//       if (data && data.length > 0) {
//         for (const stream of data) {
//           for (const message of stream.messages) {
//             // console.log(" Processing Message:", message);

//             const messageData = message.message;
//             // console.log("Parsed Message:", messageData);

//             const { roomId, message: chatMessage, userId } = messageData;


//             const roomExists = await prismaClient.room.findUnique({
//               where: { id: Number(roomId) },
//             });

//             if (!roomExists) {
//               // console.error(` Error: Room ID ${roomId} does not exist in the database.`);
//               continue; 
//             }

//             await prismaClient.chat.create({
//               data: {
//                 roomId: Number(roomId),
//                 message: chatMessage as string,
//                 userId: userId || "",
//               },
//             });

//             // console.log(" Saved to DB:", messageData);

//             await subscriber.xDel(stream.name, message.id);
//             // console.log(" Deleted from Redis Stream:", message.id);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Redis Subscribe Error:", error);
//     }
//   }
// }

// processMessages();






import "./config.js";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOPIC, redisURL } from "./config.js";
import { createClient } from "redis";
import prismaClient from "@repo/db/client";

class WebSocketSingleton {
  private static instance: WebSocketServer;

  public static getInstance(): WebSocketServer {
    if (!WebSocketSingleton.instance) {
      WebSocketSingleton.instance = new WebSocketServer({ port: 8080 });
    }
    return WebSocketSingleton.instance;
  }
}

const wss = WebSocketSingleton.getInstance();
const redisClient = createClient({ url: redisURL });
const subscriber = createClient({ url: redisURL });

(async () => {
  try {
    await Promise.all([redisClient.connect(), subscriber.connect()]);
    console.log("Connected to Redis");
  } catch (err) {
    console.error(" Redis connection error:", err);
  }
})();

redisClient.on("error", (err) => console.error(" Redis Client Error:", err));
subscriber.on("error", (err) => console.error(" Redis Subscriber Error:", err));

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

async function checkUser(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    return typeof decoded === "string" || !decoded?.userId ? null : decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on("connection", async function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = await checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  const user: User = { userId, rooms: [], ws };
  users.push(user);

  ws.on("message", async (message) => {
    let parsedData: any;
    try {
      parsedData = JSON.parse(typeof message === "string" ? message : message.toString());
    } catch (err) {
      return;
    }

    const { type, roomId, message: chatMessage, shape, shapeIndex, deleteIndex, shapeId } = parsedData;

    switch (type) {
      case "join_room":
        user.rooms.push(roomId);

        try {
          const previousMessages = await redisClient.xRange(TOPIC, "-", "+");
          const roomMessages = previousMessages
            .map(({ message }) => message)
            .filter((msg) => msg.roomId === roomId);

          if (roomMessages.length > 0) {
            ws.send(JSON.stringify({ type: "previous_messages", messages: roomMessages }));
          }
        } catch (error) {
          console.error(" Error fetching previous messages:", error);
        }

        break;

      case "leave_room":
        user.rooms = user.rooms.filter((id) => id !== roomId);
        break;

      case "chat":
        const messageData = {
          roomId,
          message: chatMessage,
          userId,
        };

        try {
          await redisClient.sendCommand([
            "XADD",
            TOPIC,
            "MAXLEN",
            "~",
            "1000",
            "*",
            "roomId",
            String(roomId),
            "message",
            String(chatMessage),
            "userId",
            String(userId),
          ]);

          broadcastToRoom(roomId, { type: "chat", roomId, chatMessage });
        } catch (error) {
          console.error(" Error adding message to Redis stream:", error);
        }
        break;

      case "move_shape":
        broadcastToRoom(roomId, { type: "move_shape", roomId, shape, shapeIndex });
        break;

      case "delete_shape":
        broadcastToRoom(roomId, { type: "delete_shape", roomId, deleteIndex });
        break;

      case "delete_shape_by_id":
        broadcastToRoom(roomId, { type: "delete_shape_by_id", roomId, shapeId });
        break;
    }
  });

  ws.on("close", () => removeUser(ws));
  ws.on("error", () => removeUser(ws));
});

function broadcastToRoom(roomId: string, message: object) {
  users.forEach((user) => {
    if (user.rooms.includes(roomId)) {
      user.ws.send(JSON.stringify(message));
    }
  });
}

function removeUser(ws: WebSocket) {
  const userIndex = users.findIndex((user) => user.ws === ws);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }
}

async function processMessages() {
  // console.log("🔄 Redis Subscriber is listening for messages...");

  while (true) {
    try {
      const data = await subscriber.xRead([{ key: TOPIC, id: "0" }], { BLOCK: 5000 });

      if (data && data.length > 0) {
        for (const stream of data) {
          for (const message of stream.messages) {
            const messageData = message.message;
            const { roomId, message: chatMessage, userId } = messageData;

            const roomExists = await prismaClient.room.findUnique({
              where: { id: Number(roomId) },
            });

            if (!roomExists) {
              console.error(` Room ID ${roomId} does not exist in the database.`);
              continue;
            }

            await prismaClient.chat.create({
              data: {
                roomId: Number(roomId),
                message: String(chatMessage),
                userId: userId || "",
              },
            });

            await subscriber.xDel(stream.name, message.id);
          }
        }
      }
    } catch (error) {
      console.error(" Redis Subscribe Error:", error);
    }
  }
}

processMessages();
