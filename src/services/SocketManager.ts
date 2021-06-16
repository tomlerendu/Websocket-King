import Connection from '../models/connection';
import Socket from './Socket';

export default class SocketManager {
  private sockets: { [key: string]: Socket } = { };

  public create(connection: Connection) {
    const socket = new Socket(connection);

    this.sockets[connection.id] = socket;

    return socket;
  }

  public disconnect(connection: Connection) {
    if (this.sockets[connection.id]) {
      this.sockets[connection.id].shouldAutoReconnect = false;
      this.sockets[connection.id].socket?.close();
      delete this.sockets[connection.id];
    }
  }

  public cancelReconnect(connection: Connection) {
    if (this.sockets[connection.id]) {
      this.sockets[connection.id].shouldAutoReconnect = false;
    }
  }

  public send(connection: Connection, message: string) {
    if (this.sockets[connection.id]) {
      this.sockets[connection.id].send(message);
    }
  }
}
