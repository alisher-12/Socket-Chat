import express from "express";
import { Server as HttpServer} from "http";
import chatLogic from "./logic/chat-logic";

const expressServer = express();

const httpServer: HttpServer = expressServer.listen(3001, () => {
    console.log("Listening on http://localhost:3001");
});

chatLogic(httpServer);