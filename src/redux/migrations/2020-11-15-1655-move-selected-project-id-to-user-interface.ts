export default {
  id: '2020-11-15-1655-move-selected-project-id-to-user-interface',
  migrator: (state: any) => {
    state.userInterface.selectedProjectId = state.selectedProjectId;
    delete state.selectedProjectId;

    return state;
  },
};
