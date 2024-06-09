import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import authRoute from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js"
import usersRoute from "./routes/user.routes.js"

import connectMongoDB from "./db/connection.js";
import { app, server } from "./socket/socket.js";
const __dirname = path.resolve();


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
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend's URL here
  credentials: true
}));

app.use(express.json()); 
app.use(cookieParser()); 
app.use('/static', express.static(path.join(__dirname, 'Frontend/dist')));
// app.get("/", (req, res) => {
//     res.send("Server is running...")
// })

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});


const staticPath = path.join(__dirname, 'Frontend', 'dist');
app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


const PORT = process.env.PORT || 8900;

app.use("/api/auth", authRoute);
app.use("/api/message", messagesRoute);
app.use("/api/users", usersRoute);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
    connectMongoDB()
    console.log(`Server is running on port ${PORT}`)
})