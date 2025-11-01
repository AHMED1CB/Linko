// Imports
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./Mongose/Connection.js";


import Auth from "./Routes/Auth.js";
import Users from "./Routes/Users.js";
import Requests from "./Routes/Requests.js";
import Friends from "./Routes/Friends.js";

import { errorHandler } from "./Middleware/ErrorHandler.js";
import authToken from "./Middleware/Auth.js";
import SocketController from "./Controllers/SocketController.js";

dotenv.config();

// Connecto To Database
connect();

// EXPRESS
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


const env = process.env.APP;
const allowedOrigin = "https://linko-k9bk.onrender.com" // APP URL 
// Routes



app.use("/auth", Auth);
app.use("/users", Users);
app.use("/requests", authToken, Requests);
app.use("/friends", authToken, Friends);

app.use("/storage", (req, res, next) => {

  const origin = req.get("origin") || req.get("referer");

  if (env === "PROD") {
    if (origin && origin.startsWith(allowedOrigin)) {
      return express.static("./Storage")(req, res, next);
    } else {
      return res.status(403).json({
        message: "Access Denied",
        status: "Fail"
      });
    }
  } else {
    return express.static("./Storage")(req, res, next);
  }

})

// Error Handler 
app.use(errorHandler);


// SOCKET IO
let server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env === "PROD" ? allowedOrigin : "*"
  }
});

io.on('connection', (socket) => {
  new SocketController(io, socket);
})


server.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});
