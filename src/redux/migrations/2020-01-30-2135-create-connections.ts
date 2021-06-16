import { v4 as uuid } from 'uuid';
import { ConnectionSocketStatus } from '../../models/connection';

export default {
  id: '2020-01-30-2135-create-connections',
  migrator: (state: any) => {
    state.connections = { };

    Object.values(state.projects)
      .forEach((project: any) => {
        const id = uuid();

        state.connections[id] = {
          id,
          projectId: project.id,
          socketUrl: project.socketUrl,
          socketProtocols: project.protocols,
          socketAutoReconnect: project.autoReconnect,
          socketStatus: ConnectionSocketStatus.Disconnected,
          socketSecondsUntilReconnect: null,
          minimizedOrder: null,
          maximizedOrder: new Date().getTime(),
          color: '#000000',
          optionsPanelOpen: false,
          savedPayloadsPanelOpen: false,
        };

        Object.values(state.tabs).forEach((tab: any) => {
          if (tab.projectId === project.id) {
            delete tab.projectId;
            tab.connectionId = id;
          }
        });

        Object.values(state.events).forEach((event: any) => {
          if (event.projectId === project.id) {
            delete event.projectId;
            event.connectionId = id;
          }
        });

        delete state.projects[project.id].protocols;
        delete state.projects[project.id].socketUrl;
        delete state.projects[project.id].autoReconnect;
      });

    return state;
  },
};
