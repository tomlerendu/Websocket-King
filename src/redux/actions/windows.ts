import Window from '../../models/window';
import Project from '../../models/project';
import createOrmAction from '../../services/orm/create-orm-action';

export const windowsMarkClosed = createOrmAction((
  { builder },
  window: Window,
) => {
  const connectionsExist = builder('connections')
    .where('windowId', window.id)
    .exists();

  if (connectionsExist) {
    builder('windows')
      .whereModel(window)
      .update({ closedAt: new Date().toISOString() });
  } else {
    builder('windows')
      .whereModel(window)
      .delete();
  }
});

export const windowsReassignConnectionsAndDelete = createOrmAction((
  { builder },
  from: Window,
  to: Window,
) => {
  builder('connections')
    .where('windowId', from.id)
    .update({ windowId: to.id });

  builder('windows')
    .whereModel(from)
    .delete();
});

export const windowsRemoveClosedForProject = createOrmAction((
  { builder },
  project: Project,
) => {
  const windowsToDeleteIds = builder('windows')
    .where('projectId', project.id)
    .whereNotNull('closedAt')
    .get()
    .map((connection) => connection.id);

  const connectionsToDeleteIds = builder('connections')
    .whereIn('id', windowsToDeleteIds)
    .get()
    .map((connection) => connection.id);

  builder('tabs')
    .whereIn('connectionId', connectionsToDeleteIds)
    .delete();

  builder('events')
    .whereIn('connectionId', connectionsToDeleteIds)
    .delete();

  builder('connections')
    .whereIn('id', connectionsToDeleteIds)
    .delete();

  builder('windows')
    .whereIn('id', windowsToDeleteIds)
    .delete();
});
