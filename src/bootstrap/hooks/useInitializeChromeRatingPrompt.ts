import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import isPlatform from '../../helpers/isPlatform';
import NotificationsActions from '../../providers/notifications/notifications.actions';
import { NotificationsDispatchContext } from '../../providers/notifications/notifications.provider';
import { internalPropertiesSet } from '../../redux/actions/internal-properties';
import State from '../../redux/state';

function useInitializeChromeRatingPrompt() {
  const dispatch = useDispatch();
  const notificationsDispatch = useContext(NotificationsDispatchContext);
  const internalProperties = useSelector<State, State['internalProperties']>(
    (state) => state.internalProperties,
  );

  useEffect(
    () => {
      if (
        internalProperties.RunCount.value > 20
        && !internalProperties.HasShownChromeRatingPrompt.value
        && isPlatform('chrome')
      ) {
        notificationsDispatch({
          type: NotificationsActions.Push,
          payload: {
            title: 'Enjoying WebSocket King?',
            body: 'Why not leave a rating on the Chrome Web Store.',
            actions: [
              {
                label: 'No thanks',
              },
              {
                label: 'Give rating',
                theme: 'primary',
                onClick: () => window.open(config.chromeWebstoreLink, '_blank'),
              },
            ],
          },
        });
        dispatch(
          internalPropertiesSet('HasShownChromeRatingPrompt', true),
        );
      }
    },
    [],
  );
}

export default useInitializeChromeRatingPrompt;
