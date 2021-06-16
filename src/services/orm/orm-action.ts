import State from '../../redux/state';
import Model from './model';

export enum MutationType {
  Create,
  Update,
  Delete,
}

export interface Mutation<T extends Model> {
  type: MutationType,
  payload: {
    table: keyof State,
    models?: T[],
    fields?: Partial<T>,
  },
}

export enum OrmActionType {
  Mutations = 100,
  BroadcastedMutations = 101,
}

export default interface OrmAction {
  type: OrmActionType.Mutations,
  payload: Mutation<Model>[],
}
