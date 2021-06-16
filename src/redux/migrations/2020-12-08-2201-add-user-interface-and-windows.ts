import { v4 as uuid } from 'uuid';

export default {
  id: '2020-12-08-2201-add-user-interface-and-windows',
  migrator: (state: any) => {
    let selectedWindowId: any = null;
    state.windows = { };

    Object.values(state.projects).forEach((project: any) => {
      const windowId = uuid();

      state.windows[windowId] = {
        id: windowId,
        projectId: project.id,
        openedAt: new Date().toISOString(),
        closedAt: new Date().toISOString(),
      };

      if (state.userInterface.selectedProjectId === project.id) {
        selectedWindowId = windowId;
      }

      Object.values(state.connections)
        .filter((connection: any) => connection.projectId === project.id)
        .forEach((connection: any) => {
          connection.windowId = windowId;
        });
    });

    state.userInterfaceProperties = {
      SelectedWindowId: {
        id: 'SelectedWindowId',
        value: selectedWindowId,
      },
      SelectedProjectId: {
        id: 'SelectedProjectId',
        value: state.userInterface.selectedProjectId,
      },
      SidebarOpen: {
        id: 'SidebarOpen',
        value: state.userInterface.sidebarOpen,
      },
    };

    delete state.userInterface;

    return state;
  },
};
