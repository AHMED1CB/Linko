// Imports
import express from 'express';
import dotenv from 'dotenv';
import http from 'http'
import { Server } from 'socket.io';
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from "body-parser";

import connect from './Mongose/Connection.js';
import Auth from './Routes/Auth.js'
import { errorHandler } from './Middleware/ErrorHandler.js';



dotenv.config();

// Connecto To Database
connect()

// EXPRESS
const app = express();
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())


// Auth Routes

app.use('/auth' , Auth)
app.use(errorHandler)


// End Auth Routes


// SOCKET IO
let server = http.createServer();
const io = new Server(server)

io.on('connection' , (socket) => {
    // Will Add Events Soon
})



app.listen(process.env.PORT || 5000 , () => {
    console.log('Server Started')
})

