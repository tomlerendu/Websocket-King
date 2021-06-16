import { EventType } from '../../models/event';
import Connection, { ConnectionSocketStatus } from '../../models/connection';
import SocketManager from '../../services/SocketManager';
import createOrmAction from '../../services/orm/create-orm-action';
import { eventsCreate } from './events';

const manager = new SocketManager();

export function socketDisconnect(connection: Connection) {
  return () => {
    manager.disconnect(connection);
  };
}

export function socketSend(connection: Connection, payload: string) {
  return () => {
    manager.send(connection, payload);
  };
}

export const connectionCreate = createOrmAction((
  { builder },
  connection: Connection,
  socketSecondsUntilReconnect: number,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketSecondsUntilReconnect });
});

export const socketPendingReconnection = createOrmAction((
  { builder },
  connection: Connection,
  socketSecondsUntilReconnect: number,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketSecondsUntilReconnect });
});

export const socketPending = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketStatus: ConnectionSocketStatus.Pending });
});

export const socketDisconnected = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketStatus: ConnectionSocketStatus.Disconnected });
});

export const socketConnected = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketStatus: ConnectionSocketStatus.Connected });
});

export const socketConnect = createOrmAction((
  { dispatch },
  connection: Connection,
) => {
  dispatch(
    eventsCreate(
      connection,
      EventType.Meta,
      `Connecting to ${connection.socketUrl}`,
    ),
  );

  dispatch(socketPending(connection));

  const socket = manager.create(connection);

  socket.onConnect(() => {
    dispatch(
      eventsCreate(
        connection,
        EventType.Meta,
        `Connected to ${connection.socketUrl}`,
      ),
    );

    dispatch(socketConnected(connection));
  });

  socket.onDisconnect(() => {
    dispatch(
      eventsCreate(
        connection,
        EventType.Meta,
        `Disconnected from ${connection.socketUrl}`,
      ),
    );

    dispatch(socketDisconnected(connection));
  });

  socket.onReconnect((isFirstReconnectMessage, seconds) => {
    if (isFirstReconnectMessage) {
      dispatch(
        eventsCreate(
          connection,
          EventType.Meta,
          `Disconnected. Reconnecting to ${connection.socketUrl}`,
        ),
      );
    }

    dispatch(socketPendingReconnection(connection, seconds));
  });

  socket.onMessage((message) => {
    dispatch(eventsCreate(connection, EventType.Received, message));
  });

  socket.onSend((message) => {
    dispatch(eventsCreate(connection, EventType.Sent, message));
  });

  socket.onError((error) => {
    dispatch(socketDisconnected(connection));

    dispatch(
      eventsCreate(
        connection,
        EventType.Meta,
        `An unknown error occurred: ${error}.`,
      ),
    );
  });

  socket.onConnectError(() => {
    dispatch(socketDisconnected(connection));

    dispatch(
      eventsCreate(
        connection,
        EventType.Meta,
        `Could not connect to "${connection.socketUrl}". `
          + 'You may be able to find more information using Inspector/Dev Tools on this page.',
      ),
    );
  });

  socket.connect();
});
