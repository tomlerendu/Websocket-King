import React from 'react';
import 'twin.macro';
import ButtonAction from '../../../types/UserInterface/ButtonAction';
import ButtonPrimary from '../Styled/ButtonPrimary';
import ButtonSecondary from '../Styled/ButtonSecondary';

export interface PopupButtonsProps {
  actions: ButtonAction[],
}

export default function PopupButtons({
  actions,
}: PopupButtonsProps) {
  return (
    <div
      tw="flex justify-end px-4 py-2 bg-gray-100 dark:bg-gray-850 border-t dark:border-none"
    >
      {actions.map((action) => (
        action.theme === 'primary'
          ? (
            <ButtonPrimary
              key={action.label}
              type={action.type || 'button'}
              onClick={() => action.onClick?.()}
              tw="ml-2 py-1 px-4 rounded"
            >
              {action.label}
            </ButtonPrimary>
          )
          : (
            <ButtonSecondary
              key={action.label}
              type={action.type || 'button'}
              onClick={() => action.onClick?.()}
              tw="ml-2 py-1 px-4 rounded"
            >
              {action.label}
            </ButtonSecondary>
          )
      ))}
    </div>
  );
}
