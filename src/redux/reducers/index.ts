import { combineReducers } from 'redux';
import State from '../state';
import createReducer from '../../services/orm/reducer';
import SavedPayload from '../../models/saved-payload';
import Window from '../../models/window';
import Project from '../../models/project';
import Event from '../../models/event';
import Tab from '../../models/tab';
import Connection from '../../models/connection';
import InternalProperty from '../../models/internal-property';
import UserInterfaceProperty from '../../models/user-interface-property';
import { ActionType } from '../actions';

const reducers = combineReducers({
  migrations: (state: State) => state || { },
  windows: createReducer<Window>('windows'),
  projects: createReducer<Project>('projects'),
  connections: createReducer<Connection>('connections'),
  savedPayloads: createReducer<SavedPayload>('savedPayloads'),
  events: createReducer<Event>('events'),
  tabs: createReducer<Tab>('tabs'),
  userInterfaceProperties: createReducer<UserInterfaceProperty<any>>('userInterfaceProperties'),
  internalProperties: createReducer<InternalProperty<any>>('internalProperties'),
});

const rootReducer = (
  combinedReducers: typeof reducers,
) => (
  (state: any, action: any) => {
    switch (action.type) {
      case ActionType.Replace:
        return action.payload;
      default:
        return combinedReducers(state, action);
    }
  }
);

export default rootReducer(reducers);
