import React from 'react';
import 'twin.macro';
import { MdClose } from 'react-icons/md';
import ButtonPrimary from '../Styled/ButtonPrimary';
import ButtonSecondary from '../Styled/ButtonSecondary';
import Notification from '../../../types/UserInterface/Notification';

export interface NotificationListItemProps {
  notification: Notification,
  onClose: () => void,
}

export default function NotificationListItem({
  notification,
  onClose,
}: NotificationListItemProps) {
  return (
    <div tw="bg-gray-100 dark:bg-gray-900 dark:border dark:border-gray-700 rounded-lg border shadow p-4 w-96">
      <div tw="flex justify-between">
        <strong tw="font-semibold text-gray-900 dark:text-gray-100">
          {notification.title}
        </strong>
        <ButtonSecondary tw="p-1">
          <MdClose onClick={() => onClose()} />
        </ButtonSecondary>
      </div>
      <p tw="my-2 select-text text-sm text-gray-700 dark:text-gray-300">
        {notification.body}
      </p>
      <div tw="flex justify-end">
        {notification.actions.map((action) => (
          action.theme === 'primary'
            ? (
              <ButtonPrimary
                key={action.label}
                tw="ml-2 py-1 px-2 rounded"
                onClick={() => {
                  action.onClick?.();
                  onClose();
                }}
              >
                {action.label}
              </ButtonPrimary>
            )
            : (
              <ButtonSecondary
                key={action.label}
                tw="ml-2 py-1 px-2 rounded"
                onClick={() => {
                  action.onClick?.();
                  onClose();
                }}
              >
                {action.label}
              </ButtonSecondary>
            )
        ))}
      </div>
    </div>
  );
}
