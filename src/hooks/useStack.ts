import { useState } from 'react';

export default function useStack<T>(): {
  push: (value: T) => void,
  pop: () => T,
  clear: () => void,
  isEmpty: () => boolean,
  items: T[],
} {
  const [items, setItems] = useState<T[]>([]);

  const push = (value: T) => {
    setItems([
      value,
      ...items,
    ]);
  };

  const pop = () => {
    const [component, ...newComponents] = items;
    setItems(newComponents);

    return component;
  };

  const isEmpty = () => items.length === 0;

  const clear = () => setItems([]);

  return {
    push,
    pop,
    isEmpty,
    clear,
    items,
  };
}
