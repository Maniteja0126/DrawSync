import "./config.js";
import express from 'express';
import { authRoute } from './route/userRoute.js';
import {roomRoute} from './route/roomManager.js';
import cors from 'cors';
import { PORT as CONFIG_PORT } from "./config.js";


const app = express();
let PORT = CONFIG_PORT || 3001;

// CORS config

const allowedOrigins = process.env.FRONTEND_URLS 
    ? process.env.FRONTEND_URLS.split(',') 
    : ['http://localhost:3000'];

interface CorsOptions {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: true) => void) => void;
    methods: string[];
    allowedHeaders: string[];
}

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some((allowed) => new RegExp(allowed).test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/room" , roomRoute);
app.listen(PORT ,()=>{
    console.log("Server is running");
});