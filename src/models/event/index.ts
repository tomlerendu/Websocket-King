import Model from '../../services/orm/model';

export enum EventType {
  Meta,
  Sent,
  Received,
}

export enum EventFormat {
  Unknown,
  Json,
}

export default interface Event extends Model {
  connectionId: string,
  type: EventType,
  format: EventFormat,
  timestamp: string,
  payload: string,
}
