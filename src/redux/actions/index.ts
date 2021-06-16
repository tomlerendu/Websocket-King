import OrmAction, { OrmActionType } from '../../services/orm/orm-action';
import State from '../state';

export enum ActionType {
  Replace,
}

export interface Action {
  type: ActionType | OrmActionType,
  payload: { [key: string]: any }
}

export function replace(state: State) {
  return {
    type: ActionType.Replace,
    payload: state,
  };
}

export function broadcastedOrmAction(
  action: OrmAction,
) {
  return {
    type: OrmActionType.BroadcastedMutations,
    payload: action,
  };
}
