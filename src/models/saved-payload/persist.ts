import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';
import SavedPayload from '.';

const persist: PersistenceStratergy<SavedPayload> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
