import PersistenceBroadcastChannelAction, { PersistenceBroadcastChannelActionType } from './persistence-boardcast-channel-action';

class PersistenceBroadcastChannel {
  private callbacks: {
    action: PersistenceBroadcastChannelActionType,
    callback: (action: PersistenceBroadcastChannelAction) => void
  }[] = [];

  private channel = new BroadcastChannel('persist');

  public constructor() {
    this.channel.onmessage = (message) => {
      this.callbacks
        .filter((callback) => callback.action === message.data?.type)
        .forEach((callback) => callback.callback(message.data));
    };
  }

  public send(action: PersistenceBroadcastChannelAction) {
    this.channel.postMessage(action);
  }

  public receive(
    action: PersistenceBroadcastChannelActionType,
    callback: (action: PersistenceBroadcastChannelAction) => void,
  ) {
    this.callbacks.push({
      action,
      callback,
    });
  }
}

const persistenceBroadcastChannel = new PersistenceBroadcastChannel();

export default persistenceBroadcastChannel;
