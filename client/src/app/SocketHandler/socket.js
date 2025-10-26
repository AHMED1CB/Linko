import { io } from "socket.io-client";
const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

const socket = io(SERVER_URL, {
    transports: ["websocket"],
});


socket.register = function (id) {
    if (id) socket.emit("register", { id });
};

socket.message = function (data) {
    socket.emit("message", data);
};



export default socket;
