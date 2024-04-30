import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});
// mongoose.connection.on("connected", ()=> {
//     console.log("mongoDB connected!");
// });

// app.get("/", (req, res)=> {
//     res.send("Hello first request");
// });




//middlewares 
// <-----
// app.use((req, res, next)=> {
//     console.log("Hi middleware");
//     next();    
// });        we will use error handling middlewares

//use instead of proxy
app.use(cors());

// this is middleware too and its cookie parser 
app.use(cookieParser());

app.use(express.json()); //so that we can send json through express

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error handling middlewares
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went Wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
// ---->

app.listen(8800, () => {
    connect();
    console.log("Connected to backend!");
});