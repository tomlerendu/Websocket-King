import React from 'react';
import 'twin.macro';
import ConnectionModel from '../../models/connection';
import EventsConnected from './Events/EventsConnected';
import HeaderConnected from './Header/HeaderConnected';
import EditorConnected from './Editor/EditorConnected';
import { ConnectionComponent } from './Connection.styles';

export interface ConnectionProps {
  connection: ConnectionModel,
  highlighted: boolean,
}

export default function Connection({
  connection,
  highlighted,
}: ConnectionProps) {
  return (
    <div tw="h-full w-full pr-2">
      <ConnectionComponent highlighted={highlighted}>
        <HeaderConnected connection={connection} />
        <EditorConnected connection={connection} />
        <div tw="flex flex-col flex-grow">
          <EventsConnected connection={connection} />
        </div>
      </ConnectionComponent>
    </div>
  );
}
