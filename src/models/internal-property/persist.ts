import { mapValues } from 'lodash';
import InternalProperty from '.';
import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';
import Table from '../../redux/table';

const persist: PersistenceStratergy<InternalProperty<any>> = {
  shouldBroadcast: false,
  persist: (table: Table<InternalProperty<any>>) => mapValues(
    table,
    (property) => (
      ['InitializedRunCount', 'InitializedWindowId'].includes(property.id)
        ? {
          ...property,
          value: false,
        }
        : property
    ),
  ),
};

export default persist;
