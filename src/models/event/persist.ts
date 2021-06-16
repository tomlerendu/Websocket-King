import Event from '.';
import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';

const persist: PersistenceStratergy<Event> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
