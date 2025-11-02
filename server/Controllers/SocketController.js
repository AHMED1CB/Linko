import { randomInt } from "crypto";
import Message from "../Models/Message.js";
import fs from 'fs'
import path from 'path'

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

        if (!data || !data.from || !data.to || !data.content) return;
        if (typeof data.content == 'string' && !data.content.trim()) return;

        const senderId = SocketController.Users.get(data.from.trim());
        const reciverId = SocketController.Users.get(data.to.trim());


        if ((data?.type === 'TXT' || null)) { // TXT IS THE DEFAULT
            await this.sendTxTMessage(data, senderId, reciverId)
        } else if (data.type === 'IMG') {
            this.sendImgMessage(data, senderId, reciverId)
        } else if (data.type === 'VOI') {
            this.sendVoiceMessage(data, senderId, reciverId)
        }


    }

    async sendVoiceMessage(data, sender, reciver) {


        let details = {
            from: data.from,
            to: data.to,
            type: 'VOI',
            content: null
        }

        // uploade audio file


        const audiosPath = path.join(process.cwd(), "Storage/voices");
        const fileName = Date.now() + randomInt(999999) + '__voi.webm'


        fs.writeFileSync(path.join(audiosPath, fileName), Buffer.from(data.content));

        details.content = fileName;


        const message = await Message.create(details);

        if (sender) {

            this.sendTo(sender, 'message', message)

        }
        if (reciver) {
            this.sendTo(reciver, 'message', message)
        }

    }

    async sendImgMessage(data, sender, reciver) {

        let details = {
            type: 'IMG',
            content: null,
            from: data.from,
            to: data.to
        }

        let imgFileContent = data.content;
        imgFileContent = Buffer.from(imgFileContent, 'base64')

        const imgsPath = path.join(process.cwd(), "Storage/imgs");
        const fileName = Date.now() + randomInt(999999) + '__img.png'

        fs.writeFileSync(path.join(imgsPath, fileName), imgFileContent);

        details.content = fileName;


        // save image message on database (path)

        const message = await Message.create(details);

        if (sender) {

            this.sendTo(sender, 'message', message)

        }
        if (reciver) {
            this.sendTo(reciver, 'message', message)

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
                    this.sendTo(sender, 'message', message);
                }

                if (reciver) {
                    this.sendTo(reciver, 'message', message)
                }


            }
        } catch (error) {
            this.socket.to(sender).emit('error', {
                message: "Something Went Wrong"
            })
        }


    }



    sendTo(id, event, data) {
        this.io.to(id).emit(event, data);
    }

}