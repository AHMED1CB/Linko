import { Server } from "socket.io";

export default class SocketController {

    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: "*"
            }
        });

        this.events = [
            {
                name: 'register',
                action: 'RegisterNewUser'
            }
        ]


        this.users = new Map();


        this.io.on('connection', (socket) => {

            this.events.forEach(event => {
                socket.on(event.name, (data) => this[event.name](data.socket))
            })

        })

    }

    RegisterNewUser(data, socket) {
        if (!data || !data.id) return;
        const socketId = socket.id;
        const userId = data.id;
        this.users.set(userId, socketId);
    }

}