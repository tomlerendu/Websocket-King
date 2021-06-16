import { v4 as uuid } from 'uuid';
import reducer from '../../helpers/reducer/reducer';
import Notification from '../../types/UserInterface/Notification';
import NotificationsActions from './notifications.actions';

export default reducer<Notification[]>({
  [NotificationsActions.Push]: (state, action) => ([
    ...state,
    {
      id: uuid(),
      ...action.payload,
    },
  ]),
  [NotificationsActions.Close]: (state, action) => (
    state.filter(
      (notification) => notification !== action.payload,
    )
  ),
});
