import React, { ReactNode } from 'react';
import useInitializeChromeRatingPrompt from './hooks/useInitializeChromeRatingPrompt';
import useInitializeTourPrompt from './hooks/useInitializeTourPrompt';

export interface InitializeAfterContextProps {
  children: ReactNode,
}

export default function InitializeAfterContext({
  children,
}: InitializeAfterContextProps) {
  useInitializeChromeRatingPrompt();
  useInitializeTourPrompt();

  return (
    <>
      {children}
    </>
  );
}
