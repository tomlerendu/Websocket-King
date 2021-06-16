import SocketProtocol from '../../types/socket-protocol';
import Model from '../../services/orm/model';

export enum ConnectionSocketStatus {
  Disconnected,
  Pending,
  Connected,
  PendingReconnection,
}

export default interface Connection extends Model {
  windowId: string,
  projectId: string,
  name: string,
  socketUrl: string,
  socketProtocols: SocketProtocol[],
  socketAutoReconnect: boolean,
  socketStatus: ConnectionSocketStatus,
  socketSecondsUntilReconnect: number | null,
  order: number,
  maximized: boolean,
}
