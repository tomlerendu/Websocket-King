export default {
  id: '2020-10-18-1744-add-name-to-connections',
  migrator: (state: any) => {
    const connectionCounts: any = { };

    Object.values(state.connections).forEach((connection: any) => {
      connectionCounts[connection.projectId] = connectionCounts[connection.projectId]
        ? connectionCounts[connection.projectId] + 1
        : 1;

      connection.name = `#${connectionCounts[connection.projectId]}`;
      delete connection.color;
    });

    return state;
  },
};
