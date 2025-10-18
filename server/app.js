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


// Routes

app.use("/auth", Auth);
app.use("/users", Users);
app.use("/requests", authToken, Requests);
app.use("/friends", authToken, Friends);

app.use("/storage", express.static('./Storage'))

// Error Handler 
app.use(errorHandler);

// SOCKET IO
let server = http.createServer(app);
const ioManager = new SocketController(server);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server Started");
});
