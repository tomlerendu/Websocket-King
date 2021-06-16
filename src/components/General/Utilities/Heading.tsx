import React, { ReactElement, ReactNode } from 'react';
import 'twin.macro';
import ButtonSecondary from '../Styled/ButtonSecondary';

export interface HeadingProps {
  buttons?: {
    icon: ReactElement,
    alt: string,
    onClick: any,
  }[],
  children: ReactNode,
}

export default function Heading({
  buttons,
  children,
}: HeadingProps) {
  return (
    <div
      tw="w-full flex bg-gray-200 dark:bg-gray-900 pl-4 pr-2"
    >
      <div
        tw="flex items-center flex-grow uppercase text-xs text-gray-800 dark:text-gray-100 font-semibold py-1 select-text"
        data-testid="title"
      >
        {children}
      </div>
      {buttons && buttons.map(
        (button) => (
          <ButtonSecondary
            type="button"
            key={button.icon + button.alt}
            tw="p-2 cursor-pointer border-gray-300 text-xs"
            title={button.alt}
            onClick={button.onClick}
          >
            { button.icon }
          </ButtonSecondary>
        ),
      )}
    </div>
  );
}
