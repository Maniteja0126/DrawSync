

import { Router, type Router as ExpressRouter } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {CreateUserSchema , SigninSchema} from "../types/types.js";
import prismaClient from "@repo/db/client";
import { JWT_SECRET } from "../config.js";







const router = Router();

router.post("/signup", async(req, res) => {
    try {
        const {username , password , name} = req.body;
        const parsedBody = CreateUserSchema.safeParse({ username, password, name });
        if(!parsedBody.success){
            res.status(400).json({
                message : "Incorrect inputs",
                parsedBody
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
        
        const existingUser = await prismaClient.user.findUnique({
            where :{
                username : parsedBody.data.username
            }
        })
        if (existingUser) {
            res.status(409).json({
                message: "User already exists"
            });
            return;
        }

        const user = await prismaClient.user.create({
            data: {
                username: parsedBody.data.username,
                password: hashedPassword,
                name : parsedBody.data.name,
                photo : parsedBody.data.photo ?? null
            }
        });

        res.status(201).json({
            userId : user.id,
            message: "User created successfully"
        });



    } catch (error) {
        console.error("Error during user creation",error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/signin", async(req, res) => {
    
    try {
        const body = req.body;
        const signin = SigninSchema.safeParse(body);

        if(!signin.success){
            res.status(400).json({
                message : "Incorrect inputs"
            });
            return;
        }

        const user = await prismaClient.user.findUnique({
            where : {
                username : signin.data.username
            }
        });
        if (!user) {
            res.status(401).json({
                message: "Invalid username or User not found"
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(signin.data.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Invalid password"
            });
            return;
        }  
        
        
        
        if (!JWT_SECRET) {
            res.status(500).json({
                message: "JWT secret is not defined"
            });
            return;
        }

        const token = jwt.sign({
            userId: user?.id,
        }, JWT_SECRET);



        res.status(200).json({
            message: "User signed in successfully",
            token
        });


    } catch (error) {
        console.error("Error during user signin",error);
        res.status(500).send("Internal Server Error");
    }
});




export const authRoute: ExpressRouter = router;