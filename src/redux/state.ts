import Project from '../models/project';
import Connection from '../models/connection';
import SavedPayload from '../models/saved-payload';
import Event from '../models/event';
import Tab from '../models/tab';
import { InternalProperties } from '../models/internal-property';
import { UserInterfaceProperties } from '../models/user-interface-property';

export default interface State {
  migrations: { [key: string]: any },
  windows: { [key: string]: any },
  projects: { [key: string]: Project },
  connections: { [key: string]: Connection },
  savedPayloads: { [key: string]: SavedPayload },
  events: { [key: string]: Event },
  tabs: { [key: string]: Tab },
  internalProperties: InternalProperties,
  userInterfaceProperties: UserInterfaceProperties,
}
