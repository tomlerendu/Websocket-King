import { v4 as uuid } from 'uuid';
import { EventType } from '../../models/event';
import Connection from '../../models/connection';
import detectPayloadFormat from '../../services/DetectPayloadFormat';
import createOrmAction from '../../services/orm/create-orm-action';

export const eventsCreate = createOrmAction((
  { builder },
  connection: Connection,
  type: EventType,
  payload: string,
) => {
  builder('events')
    .create({
      id: uuid(),
      connectionId: connection.id,
      type,
      payload,
      format: detectPayloadFormat(payload),
      timestamp: new Date().toISOString(),
    });

  if (Math.random() <= 0.1) {
    builder('events')
      .where('connectionId', connection.id)
      .sortAsc('timestamp')
      .skip(100)
      .delete();
  }
});

export const eventsRemoveForConnection = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('events')
    .where('connectionId', connection.id)
    .delete();
});

export const eventsRemoveForConnections = createOrmAction((
  { builder },
  connections: Connection[],
) => {
  builder('events')
    .whereIn('connectionId', connections.map((connection) => connection.id))
    .delete();
});
