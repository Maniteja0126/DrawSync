import { middleware } from "../middleware/userMiddleware.js";
import { Router } from "express";
import {CreateRoomSchema} from '../types/types.js';
import  prismaClient  from "@repo/db/client";

const router = Router();

router.post("/", middleware, async (req, res) => {
  try {
    const body = req.body;
    const parsedData = CreateRoomSchema.safeParse(body);
    if(!parsedData.success){
        res.json({
            message : "Incorrect inputs"
        });
        return;
    }
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "User ID is missing" });
      return;
    }

    const room = await prismaClient.room.create({

      data: {
        slug: parsedData.data.name,
        adminId: userId
      }
    })
    res.json({
      roomId : room.id
    })
	res.status(200).send();
  } catch (error) {
    console.log("Error during room creation", error);
    res.status(411).json({
       message: "Room already exists with this name"
    })
  }
});

router.get('/chats/:roomId' , async(req,res)=>{
  try {
    const roomId = req.params.roomId;
    const chats = await prismaClient.chat.findMany({
      where : {
        roomId : Number(roomId)
      },
      orderBy : {
        id : "desc"
      },
      take : 50
    });
    res.json({
      chats
    });
  } catch (error) {
    console.log(error);
        res.json({
            messages: []
        })
  }
  
});


router.get('/:slug' , async(req, res)=>{
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where :{
      slug
    }
  });
  res.json({
    room
  })
})


export const roomRoute: Router = router;