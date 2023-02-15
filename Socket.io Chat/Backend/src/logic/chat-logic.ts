import { Server as HttpServer } from "http";
import { Socket, Server as SocketIoServer } from "socket.io";

function chatLogic(httpServer: HttpServer): void {

    // Create socket server:
    const options = { cors: { origin: "*" } };
    const socketServer = new SocketIoServer(httpServer, options);

    // Listen to client connections: 
    socketServer.sockets.on("connection", (socket: Socket) => {

        console.log("Client has bee connected");

        // Listen to message from a client: 
        socket.on("msg-from-client", obj => {
            console.log(obj);

            // Send given msg to all clients: 
            socketServer.sockets.emit("msg-from-server", obj);
        });

        // Listen to client disconnect:
        socket.on("disconnect", () => {
            console.log("Client has been disconnected");
        });
        
    });

}

export default chatLogic;

