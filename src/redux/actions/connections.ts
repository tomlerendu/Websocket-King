import { v4 as uuid } from 'uuid';
import Project from '../../models/project';
import SocketProtocol from '../../types/socket-protocol';
import Connection, { ConnectionSocketStatus } from '../../models/connection';
import { socketDisconnect } from './connection-sockets';
import Tab from '../../models/tab';
import createOrmAction from '../../services/orm/create-orm-action';
import SavedPayload from '../../models/saved-payload';
import { tabCreateFromSavedPayload } from './tabs';

export const connectionCreate = createOrmAction((
  { builder },
  project: Project,
) => {
  const connection: Connection = {
    id: uuid(),
    windowId: builder('userInterfaceProperties').getPreference('SelectedWindowId'),
    projectId: project.id,
    name: `#${
      builder('connections')
        .where('projectId', project.id)
        .where('windowId', builder('userInterfaceProperties').getPreference('SelectedWindowId'))
        .get()
        .reduce(
          (previous, existingConnection) => (
            /^#[0-9]+$/.test(existingConnection.name)
              ? Math.max(
                previous,
                Number(existingConnection.name.substring(1)),
              )
              : previous
          ),
          0,
        ) + 1}`,
    socketStatus: ConnectionSocketStatus.Disconnected,
    socketUrl: project.defaultSocketUrl,
    socketProtocols: project.defaultSocketProtocols,
    socketAutoReconnect: project.defaultSocketAutoReconnect,
    socketSecondsUntilReconnect: null,
    order: Date.now(),
    maximized: true,
  };

  const tab: Tab = {
    id: uuid(),
    number: 1,
    connectionId: connection.id,
    content: '',
    selected: true,
  };

  builder('connections').create(connection);
  builder('tabs').create(tab);
});

export const connectionCreateFromSavedPayload = createOrmAction((
  { builder, dispatch },
  savedPayload: SavedPayload,
) => {
  const project = builder('projects')
    .where('id', savedPayload.projectId)
    .first()!;

  const connection: Connection = {
    id: uuid(),
    windowId: builder('userInterfaceProperties').getPreference('SelectedWindowId'),
    projectId: project.id,
    name: `#${
      builder('connections')
        .where('projectId', project.id)
        .where('windowId', builder('userInterfaceProperties').getPreference('SelectedWindowId'))
        .get()
        .reduce(
          (previous, existingConnection) => (
            /^#[0-9]+$/.test(existingConnection.name)
              ? Math.max(
                previous,
                Number(existingConnection.name.substring(1)),
              )
              : previous
          ),
          0,
        ) + 1}`,
    socketStatus: ConnectionSocketStatus.Disconnected,
    socketUrl: project.defaultSocketUrl,
    socketProtocols: project.defaultSocketProtocols,
    socketAutoReconnect: project.defaultSocketAutoReconnect,
    socketSecondsUntilReconnect: null,
    order: Date.now(),
    maximized: true,
  };

  builder('connections').create(connection);

  dispatch(
    tabCreateFromSavedPayload(connection, savedPayload),
  );
});

export const connectionRemove = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections').whereModel(connection).delete();

  builder('tabs')
    .where('connectionId', connection.id)
    .delete();

  builder('events')
    .where('connectionId', connection.id)
    .delete();
});

export const connectionToggleMaximize = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ maximized: !connection.maximized });
});

export const connectionMinimize = createOrmAction((
  { builder },
  connection: Connection,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ maximized: false });
});

export const connectionUpdateSocketUrl = createOrmAction((
  { builder },
  connection: Connection,
  socketUrl: string,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketUrl });
});

export const connectionUpdateName = createOrmAction((
  { builder },
  connection: Connection,
  name: string,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ name });
});

export const connectionUpdateProtocols = createOrmAction((
  { builder },
  connection: Connection,
  socketProtocols: SocketProtocol[],
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketProtocols });
});

export const connectionUpdateAutoReconnect = createOrmAction((
  { builder },
  connection: Connection,
  socketAutoReconnect: boolean,
) => {
  builder('connections')
    .whereModel(connection)
    .update({ socketAutoReconnect });
});

export const connectionDisconnectSocketAndRemove = createOrmAction((
  { dispatch },
  connection: Connection,
) => {
  dispatch(socketDisconnect(connection));
  dispatch(connectionRemove(connection));
});
