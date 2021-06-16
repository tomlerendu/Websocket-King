import State from '../state';
import Connection from '../../models/connection';
import { dataSource } from '../../models/connection/query';

export const connectionsForProject = (state: State): Connection[] => (
  dataSource().withState(state)
    .where('projectId', state.userInterfaceProperties.SelectedProjectId.value)
    .get()
);

export const connectionsForWindow = (state: State): Connection[] => (
  dataSource().withState(state)
    .where('projectId', state.userInterfaceProperties.SelectedProjectId.value)
    .where('windowId', state.userInterfaceProperties.SelectedWindowId.value)
    .sortAsc('order')
    .get()
);

export const connectionsMaximizedForWindow = (state: State): Connection[] => (
  dataSource().withState(state)
    .where('projectId', state.userInterfaceProperties.SelectedProjectId.value)
    .where('windowId', state.userInterfaceProperties.SelectedWindowId.value)
    .whereTrue('maximized')
    .sortAsc('order')
    .get()
);

export const connectionsMinimizedForWindow = (state: State): Connection[] => (
  dataSource().withState(state)
    .where('projectId', state.userInterfaceProperties.SelectedProjectId.value)
    .where('windowId', state.userInterfaceProperties.SelectedWindowId.value)
    .whereFalse('maximized')
    .sortAsc('order')
    .get()
);
