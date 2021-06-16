import { useEffect, useState } from 'react';

export default function useArrayFilter<T>(
  array: T[],
  query: string,
  filterProperty: (array: T) => string,
) {
  const [filteredArray, setFilteredArray] = useState<T[]>([...array]);

  useEffect(
    () => {
      if (!query.length) {
        setFilteredArray([...array]);
        return;
      }

      const parts = query.split(/(\s+)/)
        .map((part) => part.replace(/\s/g, ''))
        .filter((part) => part.length > 0)
        .map((part) => new RegExp(
          part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'i',
        ));

      setFilteredArray(
        array.filter((item) => filterProperty(item).match(parts[0])),
      );
    },
    [array, query],
  );

  return filteredArray;
}
