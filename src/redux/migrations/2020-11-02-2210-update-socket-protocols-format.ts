import { v4 as uuid } from 'uuid';

export default {
  id: '2020-11-02-2210-update-socket-protocols-format',
  migrator: (state: any) => {
    Object.values(state.projects).forEach((project: any) => {
      project.defaultSocketProtocols = (project.defaultSocketProtocols || [])
        .map((value: string) => ({ id: uuid(), value }));
    });

    Object.values(state.connections).forEach((connection: any) => {
      connection.socketProtocols = (connection.socketProtocols || [])
        .map((value: string) => ({ id: uuid(), value }));
    });

    return state;
  },
};
