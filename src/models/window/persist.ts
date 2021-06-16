import Window from '.';
import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';

const persist: PersistenceStratergy<Window> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
