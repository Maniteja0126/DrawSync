import "./config.js";
import express from 'express';
import { authRoute } from './route/userRoute.js';
import {roomRoute} from './route/roomManager.js';
import { JWT_SECRET } from './config.js';

import cors from 'cors';




const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/room" , roomRoute);
app.listen(3001 ,()=>{
    console.log("Server is running");
});