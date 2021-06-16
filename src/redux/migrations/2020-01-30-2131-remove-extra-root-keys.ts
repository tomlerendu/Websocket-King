export default {
  id: '2020-01-30-2131-remove-extra-root-keys',
  migrator: (state: any) => {
    delete state.optionsPanelOpen;

    return state;
  },
};
