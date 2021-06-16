import State from './state';

export const migrations = [
  require('./migrations/2020-01-04-0110-move-projects-to-object').default,
  require('./migrations/2020-01-30-2131-remove-extra-root-keys').default,
  require('./migrations/2020-01-30-2135-create-connections').default,
  require('./migrations/2020-02-10-2340-add-default-values-to-projects').default,
  require('./migrations/2020-02-16-1201-add-created-at-to-projects').default,
  require('./migrations/2020-10-18-1744-add-name-to-connections').default,
  require('./migrations/2020-10-21-2355-add-order-to-connections').default,
  require('./migrations/2020-10-22-1816-add-sidebar-open').default,
  require('./migrations/2020-11-02-2210-update-socket-protocols-format').default,
  require('./migrations/2020-11-13-0822-remove-options-panel-open-from-connections').default,
  require('./migrations/2020-11-15-1655-move-selected-project-id-to-user-interface').default,
  require('./migrations/2020-11-22-2244-add-meta').default,
  require('./migrations/2020-12-08-2201-add-user-interface-and-windows').default,
];

export const generateMigrationsWithKeys = () => {
  const migrationsWithKeys: any = { };

  migrations.forEach((migration) => {
    migrationsWithKeys[migration.id] = { id: migration.id };
  });

  return migrationsWithKeys;
};

export const migrate = (storedState: any): State => {
  let liveState = JSON.parse(
    JSON.stringify(storedState),
  );

  if (!liveState.migrations) {
    liveState.migrations = { };
  }

  liveState = migrations.reduce(
    (state, migration) => {
      if (state.migrations[migration.id]) {
        return state;
      }

      const migratedState = migration.migrator(
        JSON.parse(
          JSON.stringify(state),
        ),
      );

      migratedState.migrations[migration.id] = { id: migration.id };

      return migratedState;
    },
    liveState,
  );

  return liveState;
};
