import State from '../state';

export default interface PersistenceDriver {
  load: () => State | null,
  store: (state: State) => void,
}
