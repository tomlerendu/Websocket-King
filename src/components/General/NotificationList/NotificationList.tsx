import React, { Fragment } from 'react';
import 'twin.macro';
import Notification from '../../../types/UserInterface/Notification';
import Spacer from '../Utilities/Spacer';
import NotificationListItem from './NotificationListItem';

export interface NotificationListProps {
  notifications: Notification[],
  onClose: (notification: Notification) => void,
}

export default function NotificationList({
  notifications,
  onClose,
}: NotificationListProps) {
  return (
    <div tw="p-4">
      {notifications.map((notification, index) => (
        <Fragment key={notification.id}>
          <NotificationListItem
            notification={notification}
            onClose={() => onClose(notification)}
          />
          {index !== notifications.length - 1 && <Spacer />}
        </Fragment>
      ))}
    </div>
  );
}
