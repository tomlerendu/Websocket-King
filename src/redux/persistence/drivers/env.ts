import env from '../../../helpers/env';
import State from '../../state';
import PersistenceDriver from '../persistence-driver';

const driver: PersistenceDriver = {
  load: () => JSON.parse(
    env('PERSISTENCE_DRIVER_VALUE') as string,
  ) as State,
  store: () => { },
};

export default driver;
