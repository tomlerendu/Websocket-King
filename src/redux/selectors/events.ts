import State from '../state';
import Event from '../../models/event';
import Connection from '../../models/connection';
import { dataSource } from '../../models/event/query';

export const eventsForConnection = (state: State, connection: Connection): Event[] => (
  dataSource().withState(state)
    .where('connectionId', connection.id)
    .get()
    .reverse()
);
