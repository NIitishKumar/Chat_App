import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoute from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js"
import usersRoute from "./routes/user.routes.js"

import connectMongoDB from "./db/connection.js";
import { app, server } from "./socket/socket.js";


morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })

  
  
// const app = express()
dotenv.config()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json()); 
app.use(cookieParser()); 
app.get("/", (req, res) => {
    res.send("Server is running...")
})
const PORT = process.env.PORT || 8900;

app.use("/api/auth", authRoute);
app.use("/api/message", messagesRoute);
app.use("/api/users", usersRoute);
server.listen(PORT, () => {
    connectMongoDB()
    console.log(`Server is running on port ${PORT}`)
})