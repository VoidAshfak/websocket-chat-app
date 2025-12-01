import { io } from "socket.io-client"

export function connectWS() {
    return io("https://websocket-chat-app-8pdq.onrender.com:3000");
}