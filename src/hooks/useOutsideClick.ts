import { RefObject, useEffect } from 'react';

export default function useOutsideClick(
  ref: RefObject<any>,
  callback: (event?: MouseEvent) => void,
) {
  const handleClick = (event: MouseEvent) => {
    if (!ref?.current?.contains(event.target)) {
      callback(event);
    }
  };

  useEffect(() => {
    if (!ref?.current) {
      return () => true;
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    };
  });
}
