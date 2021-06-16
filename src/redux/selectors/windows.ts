import State from '../state';
import { dataSource } from '../../models/window/query';
import Window from '../../models/window';

export const closedWindowsForProject = (state: State): Window[] => (
  dataSource().withState(state)
    .where('projectId', state.userInterfaceProperties.SelectedProjectId.value)
    .whereNotNull('closedAt')
    .sortDesc('closedAt')
    .get()
);

export const currentWindow = (state: State): Window => (
  state.windows[state.userInterfaceProperties.SelectedWindowId.value!]
);
