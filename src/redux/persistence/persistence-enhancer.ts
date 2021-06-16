import { createStore } from 'redux';
import State from '../state';
import { storeState } from './persistence-manager';

const persistenceEnhancer = (create: typeof createStore) => (
  (
    reducer: any,
    initialState: Object,
    enhancer: any,
  ) => {
    const store = create(reducer, initialState, enhancer);

    store.subscribe(() => {
      storeState(store.getState() as State);
    });

    return store;
  }
);

export default persistenceEnhancer;
