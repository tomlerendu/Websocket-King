import { v4 as uuid } from 'uuid';
import State from '../state';
import channel from '../persistence/persistence-broadcast-channel';
import { PersistenceBroadcastChannelActionType } from '../persistence/persistence-boardcast-channel-action';
import sleep from '../../helpers/sleep';
import createOrmAction from '../../services/orm/create-orm-action';
import { windowsMarkClosed } from './windows';
import Window from '../../models/window';
import Project from '../../models/project';

export const connectionRemove = createOrmAction((
  { builder, state, dispatch },
  property: keyof State['internalProperties'],
  value: any,
  thenRunAction?: any,
) => {
  builder('internalProperties')
    .where('id', state.internalProperties[property].id)
    .update({ value });

  if (thenRunAction) {
    dispatch(thenRunAction);
  }
});

export const internalPropertiesIncrement = createOrmAction((
  { builder, state, dispatch },
  property: keyof State['internalProperties'],
  thenRunAction?: any,
) => {
  builder('internalProperties')
    .where('id', state.internalProperties[property].id)
    .update({ value: Number(state.internalProperties[property].value) + 1 });

  if (thenRunAction) {
    dispatch(thenRunAction);
  }
});

export const internalPropertiesSet = createOrmAction((
  { builder, state, dispatch },
  property: keyof State['internalProperties'],
  value: any,
  thenRunAction?: any,
) => {
  builder('internalProperties')
    .where('id', state.internalProperties[property].id)
    .update({ value });

  if (thenRunAction) {
    dispatch(thenRunAction);
  }
});

export const internalPropertiesInitializeWindowId = createOrmAction(async (
  { builder, state, dispatch },
  changeProject?: Project,
) => {
  const project = state.projects[
    changeProject?.id
    || state.userInterfaceProperties.SelectedProjectId.value!
  ];

  if (!project) {
    window.name = '';

    builder('internalProperties')
      .whereModel(state.internalProperties.InitializedWindowId)
      .update({ value: true });

    return;
  }

  const confirmedWindowIds: number[] = [];

  channel.receive(
    PersistenceBroadcastChannelActionType.WindowPong,
    (action) => confirmedWindowIds.push(action.payload),
  );

  channel.send({
    type: PersistenceBroadcastChannelActionType.WindowPing,
  });

  await sleep(250);

  builder('windows')
    .where('projectId', project.id)
    .whereNotIn('id', confirmedWindowIds)
    .whereNull('closedAt')
    .get()
    .forEach((window: Window) => {
      dispatch(windowsMarkClosed(window));
    });

  let windowId: string;

  const windowNameWindow = builder('windows')
    .where('projectId', project.id)
    .whereNotIn('id', confirmedWindowIds)
    .where('id', window.name)
    .whereNot('id', '')
    .whereNotNull('id')
    .first();

  const closedWindowsExist = builder('windows')
    .where('projectId', project.id)
    .whereNotIn('id', confirmedWindowIds)
    .exists();

  if (windowNameWindow) {
    windowId = windowNameWindow.id;

    builder('windows')
      .whereModel(windowNameWindow)
      .update({
        openedAt: new Date().toISOString(),
        closedAt: null,
      });
  } else if (closedWindowsExist) {
    const mostRecentlyClosedWindow = builder('windows')
      .where('projectId', project.id)
      .sortDesc('closedAt')
      .first()!;

    windowId = mostRecentlyClosedWindow.id;

    builder('windows')
      .whereModel(mostRecentlyClosedWindow)
      .update({
        openedAt: new Date().toISOString(),
        closedAt: null,
      });
  } else {
    windowId = uuid();

    builder('windows').create({
      id: windowId,
      projectId: project.id,
      openedAt: new Date().toISOString(),
      closedAt: null,
    });
  }

  builder('userInterfaceProperties')
    .whereModel(state.userInterfaceProperties.SelectedProjectId)
    .update({ value: project.id });

  builder('userInterfaceProperties')
    .whereModel(state.userInterfaceProperties.SelectedWindowId)
    .update({ value: windowId });

  builder('internalProperties')
    .whereModel(state.internalProperties.InitializedWindowId)
    .update({ value: true });

  window.name = windowId;
});
