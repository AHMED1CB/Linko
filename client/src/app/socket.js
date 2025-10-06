import { io } from "socket.io-client";
const SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
console.log(SERVER_URL)
const socket = io(SERVER_URL, {
    path: "/socket.io",
});

export default socket;
