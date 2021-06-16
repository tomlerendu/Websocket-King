import { keyBy, omit } from 'lodash';
import persistenceStratergies from '../../redux/persistence/persistence-stratergies';
import State from '../../redux/state';
import Model from './model';
import OrmAction, { Mutation, MutationType, OrmActionType } from './orm-action';
import Table from './table';

const transformTable = <T extends Model>(
  table: keyof State,
  state: Table<T>,
  mutations: Mutation<Model>[],
  transformer: (model: Model) => Model,
) => (
    mutations.reduce<Table<Model>>(
      (accumulatedState, mutation) => {
        if (mutation.payload.table === table
          && mutation.type === MutationType.Create
        ) {
          return {
            ...accumulatedState,
            ...keyBy(mutation.payload.models!.map(transformer), 'id'),
          };
        }

        if (mutation.payload.table === table
          && mutation.type === MutationType.Delete
        ) {
          return omit(
            accumulatedState,
            Object.values(mutation.payload.models!).map((model) => model.id),
          );
        }

        if (mutation.payload.table === table
          && mutation.type === MutationType.Update
        ) {
          const newState = {
            ...accumulatedState,
          };

          mutation.payload.models!.forEach((model: any) => {
            newState[model.id] = transformer({
              ...accumulatedState[model.id],
              ...mutation.payload.fields!,
            });
          });

          return newState;
        }

        return accumulatedState;
      },
      state,
    )
  );

const doNothingTransformer: (model: Model) => Model = (model) => model;

export default function createReducer<T extends Model>(table: keyof State) {
  return (state: Table<T>, action: OrmAction) => {
    if (action.type === OrmActionType.Mutations) {
      return transformTable(
        table,
        state,
        action.payload,
        doNothingTransformer,
      );
    }

    if (action.type === OrmActionType.BroadcastedMutations
      && persistenceStratergies[table]?.shouldBroadcast
    ) {
      return transformTable(
        table,
        state,
        (action.payload as any).payload,
        persistenceStratergies[table]?.broadcast || doNothingTransformer,
      );
    }

    return state || null;
  };
}
