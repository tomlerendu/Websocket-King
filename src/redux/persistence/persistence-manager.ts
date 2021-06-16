import { mapValues } from 'lodash';
import env from '../../helpers/env';
import { createInitialState } from '../initialState';
import { migrate } from '../migrations';
import { internalPropertiesAppIsReady } from '../selectors/internal-properties';
import State from '../state';
import PersistenceDriver from './persistence-driver';
import persistenceStratergies from './persistence-stratergies';

let driver: PersistenceDriver;

const getDriver = async (): Promise<PersistenceDriver> => {
  if (!driver) {
    if (env('PERSISTENCE_DRIVER') === 'env') {
      driver = (await import('./drivers/env')).default;
    } else if (env('PERSISTENCE_DRIVER') === 'localstorage') {
      driver = (await import('./drivers/local-storage')).default;
    } else {
      throw new Error('Unknown persistence driver.');
    }
  }

  return driver;
};

export const loadState = async () => {
  let state = await (await getDriver()).load();

  if (state === null) {
    state = createInitialState();
  }

  return migrate(state);
};

export const storeState = async (state: State) => {
  if (!internalPropertiesAppIsReady(state)) {
    return;
  }

  const transformedState = mapValues(
    state,
    (value, key) => (
      (persistenceStratergies as any)[key]?.persist
        ? (persistenceStratergies as any)[key as any].persist(value, state)
        : value
    ),
  );

  (await getDriver()).store(transformedState);
};
