export default {
  id: '2020-10-22-1816-add-sidebar-open',
  migrator: (state: any) => {
    state.userInterface = { sidebarOpen: true };
    return state;
  },
};
