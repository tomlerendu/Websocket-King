import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsActions from '../../providers/notifications/notifications.actions';
import { NotificationsDispatchContext } from '../../providers/notifications/notifications.provider';
import TourActions from '../../providers/tour/tour.actions';
import { TourDispatchContext } from '../../providers/tour/tour.provider';
import { internalPropertiesSet } from '../../redux/actions/internal-properties';
import State from '../../redux/state';

function useInitializeTourPrompt() {
  const dispatch = useDispatch();
  const notificationsDispatch = useContext(NotificationsDispatchContext);
  const tourDispatch = useContext(TourDispatchContext);
  const hasShownTourPrompt = useSelector<State, boolean>(
    (state) => state.internalProperties.HasShownTourPrompt.value,
  );

  useEffect(
    () => {
      if (!hasShownTourPrompt) {
        notificationsDispatch({
          type: NotificationsActions.Push,
          payload: {
            title: 'Welcome!',
            body: 'WebSocket King is a client for developing, testing and debugging WebSocket connections. Would you like to learn the basics?',
            actions: [
              {
                label: 'No thanks',
              },
              {
                label: 'Take tour',
                theme: 'primary',
                onClick: () => tourDispatch!({
                  type: TourActions.Open,
                }),
              },
            ],
          },
        });
        dispatch(
          internalPropertiesSet('HasShownTourPrompt', true),
        );
      }
    },
    [],
  );
}

export default useInitializeTourPrompt;
