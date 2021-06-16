import { mutableDataSource as connections } from '../../models/connection/query';
import { mutableDataSource as events } from '../../models/event/query';
import { mutableDataSource as internalProperties } from '../../models/internal-property/query';
import { mutableDataSource as projects } from '../../models/project/query';
import { mutableDataSource as savedPayloads } from '../../models/saved-payload/query';
import { mutableDataSource as tabs } from '../../models/tab/query';
import { mutableDataSource as userInterfaceProperties } from '../../models/user-interface-property/query';
import { mutableDataSource as windows } from '../../models/window/query';

const dataSources: {
  connections: typeof connections,
  events: typeof events,
  internalProperties: typeof internalProperties,
  projects: typeof projects,
  savedPayloads: typeof savedPayloads,
  tabs: typeof tabs,
  userInterfaceProperties: typeof userInterfaceProperties,
  windows: typeof windows,
} = {
  connections,
  events,
  internalProperties,
  projects,
  savedPayloads,
  tabs,
  userInterfaceProperties,
  windows,
};

export default dataSources;
