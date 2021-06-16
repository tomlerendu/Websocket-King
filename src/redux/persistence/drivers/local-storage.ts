import PersistenceDriver from '../persistence-driver';

const prefix: string = 'SocketKing';

const driver: PersistenceDriver = {
  load: () => {
    const storedState = localStorage[prefix];

    if (!storedState) {
      return null;
    }

    return JSON.parse(storedState);
  },
  store: (state) => {
    localStorage[prefix] = JSON.stringify(state);
  },
};

export default driver;
