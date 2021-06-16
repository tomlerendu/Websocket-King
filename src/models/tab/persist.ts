import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';
import Tab from '.';

const persist: PersistenceStratergy<Tab> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
