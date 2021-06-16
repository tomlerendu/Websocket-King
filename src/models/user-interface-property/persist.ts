import UserInterfaceProperty from '.';
import PersistenceStratergy from '../../redux/persistence/persistence-stratergy';

const persist: PersistenceStratergy<UserInterfaceProperty<any>> = {
  shouldBroadcast: false,
  persist: (table, state) => (
    {
      ...table,
      [state.userInterfaceProperties.SelectedWindowId.id]: {
        ...table[state.userInterfaceProperties.SelectedWindowId.id],
        value: null,
      },
    }
  ),
};

export default persist;
