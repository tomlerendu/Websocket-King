export default {
  id: '2020-11-13-0822-remove-options-panel-open-from-connections',
  migrator: (state: any) => {
    Object.values(state.connections).forEach((connection: any) => {
      delete connection.optionsPanelOpen;
      delete connection.savedPayloadsPanelOpen;
    });

    return state;
  },
};
