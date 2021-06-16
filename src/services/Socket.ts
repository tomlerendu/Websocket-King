import Connection from '../models/connection';

export default class Socket {
  public socket?: WebSocket;

  public shouldAutoReconnect: boolean;

  public hasEverConnected: boolean;

  public failedConnectionAttempts: number;

  public callbacks: { [key: string]: any } = { };

  public constructor(private connection: Connection) {
    this.shouldAutoReconnect = connection.socketAutoReconnect;
    this.hasEverConnected = false;
    this.failedConnectionAttempts = 0;
  }

  public connect() {
    try {
      this.socket = new WebSocket(
        this.connection.socketUrl,
        this.connection.socketProtocols.map((protocol) => protocol.value),
      );
    } catch (error) {
      this.callbacks.onConnectError();
      console.error(error); // eslint-disable-line no-console
    }

    if (!this.socket) {
      return;
    }

    this.socket.onopen = () => {
      this.failedConnectionAttempts = 0;
      this.hasEverConnected = true;
      this.callbacks.onConnect();
    };

    this.socket!.onerror = (error) => {
      this.failedConnectionAttempts += 1;

      if (this.hasEverConnected) {
        this.callbacks.onError(JSON.stringify(error));
      } else {
        this.callbacks.onConnectError();
      }
    };

    this.socket!.onclose = () => {
      if (this.hasEverConnected
        && this.shouldAutoReconnect
        && this.failedConnectionAttempts <= 5
      ) {
        this.callbacks.onReconnect(true, 3);
        setTimeout(() => this.callbacks.onReconnect(false, 2), 1000);
        setTimeout(() => this.callbacks.onReconnect(false, 1), 2000);
        setTimeout(() => this.connect(), 3000);
      } else if (this.hasEverConnected) {
        this.callbacks.onDisconnect();
      }
    };

    this.socket!.onmessage = (event) => {
      this.callbacks.onMessage(event.data);
    };
  }

  public send(message: string) {
    this.socket!.send(message);
    this.callbacks.onSend(message);
  }

  public onConnectError(callback: () => void) {
    this.callbacks.onConnectError = callback;
  }

  public onError(callback: (error: string) => void) {
    this.callbacks.onError = callback;
  }

  public onConnect(callback: () => void) {
    this.callbacks.onConnect = callback;
  }

  public onDisconnect(callback: () => void) {
    this.callbacks.onDisconnect = callback;
  }

  public onReconnect(callback: (isFirstReconnectMessage: boolean, seconds: number) => void) {
    this.callbacks.onReconnect = callback;
  }

  public onMessage(callback: (message: string) => void) {
    this.callbacks.onMessage = callback;
  }

  public onSend(callback: (message: string) => void) {
    this.callbacks.onSend = callback;
  }
}
