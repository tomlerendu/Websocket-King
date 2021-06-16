import { v4 as uuid } from 'uuid';
import Project from '../../models/project';
import Connection, { ConnectionSocketStatus } from '../../models/connection';
import Tab from '../../models/tab';
import Window from '../../models/window';
import createOrmAction from '../../services/orm/create-orm-action';

export const projectCreate = createOrmAction((
  { builder },
  name: string,
) => {
  const project: Project = {
    id: uuid(),
    name,
    formatEventPayloads: true,
    defaultSocketUrl: '',
    defaultSocketProtocols: [],
    defaultSocketAutoReconnect: false,
    createdAt: new Date().toISOString(),
  };

  const window: Window = {
    id: uuid(),
    openedAt: null,
    closedAt: null,
    projectId: project.id,
  };

  const connection: Connection = {
    id: uuid(),
    windowId: window.id,
    projectId: project.id,
    name: '#1',
    socketUrl: '',
    socketStatus: ConnectionSocketStatus.Disconnected,
    socketProtocols: [],
    socketAutoReconnect: false,
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

  builder('projects').create(project);
  builder('connections').create(connection);
  builder('tabs').create(tab);
});

export const projectUpdate = createOrmAction((
  { builder },
  project: Project,
  fields: Partial<Project>,
) => {
  builder('projects').whereModel(project)
    .update(fields);
});

export const projectRemoveRelatedItemsAndDelete = createOrmAction((
  { builder, state },
  project: Project,
) => {
  if (state.userInterfaceProperties.SelectedProjectId.value === project.id) {
    builder('userInterfaceProperties')
      .whereIn('id', ['SelectedProjectId', 'SelectedWindowId'])
      .update({ value: null });
  }

  const removeConnectionIds = builder('connections')
    .where('projectId', project.id)
    .get()
    .map((connection) => connection.id);

  builder('events')
    .whereIn('connectionId', removeConnectionIds)
    .delete();

  builder('tabs')
    .whereIn('connectionId', removeConnectionIds)
    .delete();

  builder('connections')
    .whereIn('id', removeConnectionIds)
    .delete();

  builder('windows')
    .where('projectId', project.id)
    .delete();

  builder('savedPayloads')
    .where('projectId', project.id)
    .delete();

  builder('projects')
    .whereModel(project)
    .delete();
});
