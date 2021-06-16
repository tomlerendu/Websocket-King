import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: any): T | undefined {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
