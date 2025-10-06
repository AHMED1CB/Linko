import { Server } from "socket.io";

export default class SocketController {

    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: "*"
            }
        });

        this.users = new Map();

        console.log('Socket Started')

        this.io.on('connection', (socket) => {

            socket.on('register', (data) => this.RegisterNewUser(data, socket))

        })

    }

    RegisterNewUser(data, socket) {
        if (!data || !data.id) return;
        const socketId = socket.id;
        const userId = data.id;
        this.users.set(userId, socketId);
    }

}