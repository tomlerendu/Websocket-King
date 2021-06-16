import { v4 as uuid } from 'uuid';
import State from './state';
import { ConnectionSocketStatus } from '../models/connection';
import { generateMigrationsWithKeys } from './migrations';

export function createInitialState(): State {
  const windowId = uuid();
  const projectId = uuid();
  const tabId = uuid();
  const connectionId = uuid();
  const now = new Date().toISOString();

  return {
    migrations: generateMigrationsWithKeys(),
    windows: {
      [windowId]: {
        id: windowId,
        projectId,
        openedAt: now,
        closedAt: now,
      },
    },
    projects: {
      [projectId]: {
        id: projectId,
        name: 'Untitled Project',
        formatEventPayloads: true,
        defaultSocketUrl: '',
        defaultSocketProtocols: [],
        defaultSocketAutoReconnect: false,
        createdAt: now,
      },
    },
    connections: {
      [connectionId]: {
        id: connectionId,
        windowId,
        projectId,
        name: '#1',
        socketUrl: 'wss://echo.websocket.org',
        socketProtocols: [],
        socketAutoReconnect: false,
        socketStatus: ConnectionSocketStatus.Disconnected,
        socketSecondsUntilReconnect: null,
        order: 1,
        maximized: true,
      },
    },
    tabs: {
      [tabId]: {
        id: tabId,
        connectionId,
        number: 1,
        selected: true,
        content: '',
      },
    },
    events: { },
    savedPayloads: { },
    userInterfaceProperties: {
      SelectedWindowId: {
        id: 'SelectedWindowId',
        value: windowId,
      },
      SelectedProjectId: {
        id: 'SelectedProjectId',
        value: projectId,
      },
      SidebarOpen: {
        id: 'SidebarOpen',
        value: true,
      },
    },
    internalProperties: {
      InitializedRunCount: {
        id: 'InitializedRunCount',
        value: false,
      },
      InitializedWindowId: {
        id: 'InitializedWindowId',
        value: false,
      },
      FirstUseAt: {
        id: 'FirstUseAt',
        value: now,
      },
      RunCount: {
        id: 'RunCount',
        value: 0,
      },
      HasShownChromeRatingPrompt: {
        id: 'HasShownChromeRatingPrompt',
        value: false,
      },
      HasShownTourPrompt: {
        id: 'HasShownTourPrompt',
        value: false,
      },
    },
  };
}
