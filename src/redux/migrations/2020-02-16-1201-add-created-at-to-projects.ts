export default {
  id: '2020-02-16-1201-add-created-at-to-projects',
  migrator: (state: any) => {
    Object.values(state.projects).forEach((project: any) => {
      project.createdAt = new Date().toISOString();
    });

    return state;
  },
};
