export enum PersistenceBroadcastChannelActionType {
  OrmReplay,
  WindowClosed,
  WindowPing,
  WindowPong,
}

type PersistenceBroadcastChannelAction = {
  type: PersistenceBroadcastChannelActionType,
  payload?: any,
};

export default PersistenceBroadcastChannelAction;
