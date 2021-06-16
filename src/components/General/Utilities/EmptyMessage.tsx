import React, { ReactNode } from 'react';
import 'twin.macro';
import ButtonSecondary from '../Styled/ButtonSecondary';

export interface EmptyMessageProps {
  heading: string,
  children: ReactNode,
  buttonText?: string,
  buttonOnClick?: () => void,
}

export default function EmptyMessage({
  heading,
  children,
  buttonText,
  buttonOnClick,
}: EmptyMessageProps) {
  return (
    <div
      tw="flex content-center justify-center flex-wrap flex-grow select-text"
    >
      <div tw="text-center text-xs w-3/4 p-4 rounded-lg">
        <h3
          tw="font-bold mb-2 text-gray-600 dark:text-gray-300 text-sm uppercase"
          data-testid="heading"
        >
          {heading}
        </h3>
        <p
          tw="text-gray-800 dark:text-gray-500 mb-2"
          data-testid="description"
        >
          {children}
        </p>
        {(buttonText && buttonOnClick) && (
          <ButtonSecondary
            type="button"
            tw="px-2 py-1 rounded"
            onClick={() => buttonOnClick()}
          >
            {buttonText}
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
}
