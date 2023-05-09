import { SocketMessageType } from "./socket-message-type";

export class SocketMessage {
    public messageType:SocketMessageType=SocketMessageType.LogOff;
    public timeStamp:Date=new Date();
  }