import React, { useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import ConnectionModel from '../../models/connection';
import EmptyMessage from '../General/Utilities/EmptyMessage';
import Connection from './Connection';
import useArrayInsertCallback from '../../hooks/useArrayInsertCallback';
import { ConnectionWrapperComponent } from './Connections.styles';

export interface ConnectionsProps {
  paddingLeft: boolean,
  connectionsMinimized: ConnectionModel[],
  connectionsMaximized: ConnectionModel[],
}

export default function Connections({
  paddingLeft,
  connectionsMinimized,
  connectionsMaximized,
}: ConnectionsProps) {
  const container = useRef<HTMLDivElement>(null);
  const connectionComponentRefs = useRef<HTMLDivElement[]>([]);
  const [
    recentlyMaximizedConnections,
    setRecentlyMaximizedConnections,
  ] = useState<ConnectionModel[]>([]);

  useEffect(
    () => {
      connectionComponentRefs.current = connectionComponentRefs.current
        .slice(0, connectionsMaximized.length);
    },
    [connectionsMaximized],
  );

  useArrayInsertCallback<ConnectionModel>(
    connectionsMaximized,
    'id',
    (connections) => {
      const connectionComponent = connectionComponentRefs.current[
        connectionsMaximized.indexOf(connections[0])
      ];

      if (connectionComponent && container.current) {
        container.current.scrollTo({
          top: 0,
          left: connectionComponent.offsetLeft - container.current.offsetLeft,
          behavior: 'smooth',
        });

        setRecentlyMaximizedConnections([
          ...recentlyMaximizedConnections,
          ...connections,
        ]);

        setTimeout(
          () => setRecentlyMaximizedConnections([]),
          1000,
        );
      }
    },
  );

  if (!connectionsMaximized.length && connectionsMinimized.length) {
    return (
      <EmptyMessage heading="No Open Connections">
        All of your connections are minimized. Select one from the top to open it.
      </EmptyMessage>
    );
  }

  if (!connectionsMaximized.length) {
    return (
      <EmptyMessage heading="No Connections">
        Select
        {' '}
        <strong>+</strong>
        {' '}
        at the top to create a new one.
      </EmptyMessage>
    );
  }

  return (
    <div
      ref={container}
      tw="w-full flex flex-row overflow-x-auto"
      css={[paddingLeft && tw`pl-2`]}
    >
      {connectionsMaximized.map((connection, index) => (
        <ConnectionWrapperComponent
          key={connection.id}
          ref={(element: HTMLDivElement) => {
            connectionComponentRefs.current[index] = element;
          }}
        >
          <Connection
            connection={connection}
            highlighted={recentlyMaximizedConnections.includes(connection)}
          />
        </ConnectionWrapperComponent>
      ))}
    </div>
  );
}
