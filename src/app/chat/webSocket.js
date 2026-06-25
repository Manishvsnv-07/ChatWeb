import { io } from "socket.io-client";

export const webSocket = () => {
  return io("http://localhost:8080")
}
