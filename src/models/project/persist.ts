import Project from '.';
import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';

const persist: PersistenceStratergy<Project> = {
  shouldBroadcast: true,
  persist: (table) => table,
};

export default persist;
