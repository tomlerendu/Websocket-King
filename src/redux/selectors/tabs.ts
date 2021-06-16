import State from '../state';
import Tab from '../../models/tab';
import { dataSource } from '../../models/tab/query';

export const tabsForConnection = (state: State, connectionId: string): Tab[] => (
  dataSource().withState(state)
    .where('connectionId', connectionId)
    .get()
);
