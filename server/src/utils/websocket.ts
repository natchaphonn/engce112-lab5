import consola from "consola";
import { Server } from "socket.io";

const io = new Server();

io.listen(3001, { cors: { origin: "*" } });

io.on("connection", () => consola.info("WebSocket User Connected"));

export default function useWebSocket() {
  return {
    get io() {
      return io;
    },
  };
}
