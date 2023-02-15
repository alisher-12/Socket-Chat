import { Component } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { MessageModel } from './models/message-model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private socket: Socket;
    public textToSend: string;
    public allMessages: MessageModel[] = [];

    public connect(): void {
        
        this.socket = io("http://localhost:3001");

        this.socket.on("msg-from-server", (msg: MessageModel) => {
            this.allMessages.push(msg);
        });

    }

    public send(): void {
        const msg = new MessageModel();
        msg.text = this.textToSend;
        msg.time = (new Date()).toLocaleTimeString();
        this.socket.emit("msg-from-client", msg);
        this.textToSend = "";
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}
