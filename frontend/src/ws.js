import { io } from "socket.io-client"

export function connectWS() {
    return io("https://websocket-chat-app-2-kqsw.onrender.com");
}