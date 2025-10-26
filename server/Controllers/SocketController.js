import Message from "../Models/Message.js";


export default class SocketController {

    static Users = new Map();

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.events = [
            {
                name: 'register',
                action: 'RegisterNewUser'
            },
            {
                name: 'disconnect',
                action: 'Disconnect'
            },
            {
                name: 'message',
                action: 'HandleSendMessage'

            },
        ]


        this.events.forEach(event => {
            this.socket.on(event.name, (data) => this[event.action](data))

        })

    }

    RegisterNewUser(data) {
        if (!data || !data.id) return;

        const userId = data.id.trim();

        SocketController.Users.set(userId, this.socket.id);

    }

    Disconnect() {
        SocketController.Users.forEach((sid, uid) => {
            if (sid === this.socket.id) {
                SocketController.Users.delete(uid)
            }
        })
    }


    async HandleSendMessage(data) {

        if (!data || !data.from || !data.to || !data.content.trim()) return;


        const senderId = SocketController.Users.get(data.from.trim());
        const reciverId = SocketController.Users.get(data.to.trim());


        if ((data?.type === 'TXT' || null)) {
            await this.sendTxTMessage(data, senderId, reciverId)
        }


    }
    // Socket Ids
    async sendTxTMessage(data, sender, reciver) {

        // Store The Message

        try {

            const message = await Message.create({
                from: data.from,
                to: data.to,
                type: 'TXT',
                content: data.content
            });

            if (message) {



                if (sender) {
                    this.io.to(sender).emit('message', message);
                }

                if (reciver) {
                    this.io.to(reciver).emit('message', message)

                }


            }
        } catch (error) {
            this.socket.to(sender).emit('error', {
                message: "Something Went Wrong"
            })
        }


    }

}