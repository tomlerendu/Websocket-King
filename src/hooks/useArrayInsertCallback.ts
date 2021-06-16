import { useEffect } from 'react';
import usePrevious from './usePrevious';

export default function useArrayInsertCallback<T>(
  array: T[],
  idProperty: string,
  callback: (element: T[]) => void,
) {
  const previousArray = usePrevious<T[]>(array);

  useEffect(
    () => {
      if (!previousArray) {
        return;
      }

      const previousArrayIds = previousArray.map(
        (element) => (element as any)[idProperty],
      );

      const difference = array.filter(
        (element) => !previousArrayIds.includes((element as any)[idProperty]),
      );

      if (difference.length) {
        callback(difference);
      }
    },
    [array],
  );
}
