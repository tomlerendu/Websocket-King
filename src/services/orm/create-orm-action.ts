import { Dispatch } from 'redux';
import State from '../../redux/state';
import dataSources from './data-sources';
import { Mutation, OrmActionType } from './orm-action';

type TypeOfDataSources = typeof dataSources;
type BuilderBuilder = <T extends keyof typeof dataSources>
  (table: T) => ReturnType<TypeOfDataSources[T]>;

export default function createOrmAction<T extends any[]>(
  action: (
    { builder, state, dispatch }: {
      builder: BuilderBuilder,
      state: State,
      dispatch: Dispatch<any>,
    },
    ...props: T
  ) => void,
) {
  return (...props: T) => (
    async (dispatch: Dispatch<any>, getState: () => State) => {
      const state: State = getState();
      const mutations: Mutation<any>[] = [];

      const builder: BuilderBuilder = (table) => (
        (dataSources[table]()
          .withState(state)
          .withMutationsList(mutations) as any)
      );

      await action({ builder, state, dispatch }, ...props);

      if (mutations.length > 0) {
        dispatch({
          type: OrmActionType.Mutations,
          payload: mutations,
        });
      }
    }
  );
}
