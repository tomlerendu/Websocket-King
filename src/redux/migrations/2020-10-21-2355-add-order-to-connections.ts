export default {
  id: '2020-10-21-2355-add-order-to-connections',
  migrator: (state: any) => {
    const orderCounts: any = { };

    Object.values(state.connections).forEach((connection: any) => {
      orderCounts[connection.projectId] = orderCounts[connection.projectId]
        ? orderCounts[connection.projectId] + 1
        : 1;

      connection.order = orderCounts[connection.projectId];
      connection.maximized = connection.maximizedOrder !== null;
      delete connection.minimizedOrder;
      delete connection.maximizedOrder;
    });

    return state;
  },
};
