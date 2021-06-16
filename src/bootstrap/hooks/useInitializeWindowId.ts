import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { internalPropertiesInitializeWindowId } from '../../redux/actions/internal-properties';

function useInitializeWindowId(storeReady: boolean) {
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (storeReady) {
        dispatch(
          internalPropertiesInitializeWindowId(),
        );
      }
    },
    [storeReady],
  );
}

export default useInitializeWindowId;
