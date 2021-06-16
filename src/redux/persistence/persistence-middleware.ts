import { Middleware, Dispatch } from 'redux';
import State from '../state';
import {
  Action,
  broadcastedOrmAction,
  replace,
} from '../actions';
import { loadState } from './persistence-manager';
import channel from './persistence-broadcast-channel';
import { PersistenceBroadcastChannelActionType } from './persistence-boardcast-channel-action';
import { windowsMarkClosed } from '../actions/windows';
import { OrmActionType } from '../../services/orm/orm-action';

const loadStateAndDispatch = async (dispatch: Dispatch<any>) => (
  dispatch(
    replace(
      await loadState(),
    ),
  )
);

const persistenceMiddleware: Middleware = (store) => {
  loadStateAndDispatch(store.dispatch);

  channel.receive(
    PersistenceBroadcastChannelActionType.OrmReplay,
    (action) => store.dispatch(
      broadcastedOrmAction(action.payload),
    ),
  );

  channel.receive(
    PersistenceBroadcastChannelActionType.WindowPing,
    () => channel.send({
      type: PersistenceBroadcastChannelActionType.WindowPong,
      payload: (store.getState() as State)
        .userInterfaceProperties
        .SelectedWindowId
        .value,
    }),
  );

  channel.receive(
    PersistenceBroadcastChannelActionType.WindowClosed,
    (action) => (
      store.dispatch(
        windowsMarkClosed(action.payload) as any,
      )
    ),
  );

  window.addEventListener(
    'beforeunload',
    () => {
      const state = store.getState() as State;
      const windowId = state.userInterfaceProperties
        .SelectedWindowId
        .value;

      if (windowId) {
        channel.send({
          type: PersistenceBroadcastChannelActionType.WindowClosed,
          payload: state.windows[windowId],
        });
      }
    },
  );

  return (next) => (action: Action) => {
    if (action.type === OrmActionType.Mutations) {
      channel.send({
        type: PersistenceBroadcastChannelActionType.OrmReplay,
        payload: action,
      });
    }

    return next(action);
  };
};

export default persistenceMiddleware;
