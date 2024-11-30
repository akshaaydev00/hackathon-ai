import express from "express";
import 'dotenv/config';
import { authRoute } from "./Routes/auth-route.js";import connectDB from "./Utils/db.js";
import { processRoute } from "./Routes/process-route.js";
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());
connectDB().then(() => {
    app.use("/api/v1", authRoute);
    app.use("/api/v1",processRoute);
    
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Listening to port " + process.env.SERVER_PORT + "....");
})