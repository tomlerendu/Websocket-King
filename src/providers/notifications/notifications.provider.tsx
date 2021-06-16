import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from 'react';
import 'twin.macro';
import { Portal } from 'react-portal';
import NotificationList from '../../components/General/NotificationList/NotificationList';
import Notification from '../../types/UserInterface/Notification';
import notificationsReducer from './notifications.reducer';
import NotificationsActions from './notifications.actions';

export const NotificationsDispatchContext = createContext<Dispatch<any>>(() => null);
export const NotificationsStateContext = createContext<Notification[]>([]);

const initialState: Notification[] = [];

export interface NotificationsProviderProps {
  children: ReactNode,
}

export default function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  return (
    <NotificationsDispatchContext.Provider value={dispatch}>
      <NotificationsStateContext.Provider value={state}>
        {children}
        {state.length > 0 && (
          <Portal>
            <div tw="absolute right-0 bottom-0">
              <NotificationList
                notifications={state}
                onClose={(notification) => (dispatch as any)({
                  type: NotificationsActions.Close,
                  payload: notification,
                })}
              />
            </div>
          </Portal>
        )}
      </NotificationsStateContext.Provider>
    </NotificationsDispatchContext.Provider>
  );
}
