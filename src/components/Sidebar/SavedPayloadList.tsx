import React, { useContext, useState } from 'react';
import 'twin.macro';
import SavedPayload from '../../models/saved-payload';
import TextLimit from '../General/Utilities/TextLimit';
import List from '../General/List/List';
import ListItem from '../General/List/ListItem';
import Connection from '../../models/connection';
import { PopupContext } from '../../providers/PopupProvider';
import PopupConfirmation from '../General/PopupPresets/PopupConfirmation';
import CreateEditPayloadConnected from '../CreateEditPayload/CreateEditPayloadConnected';
import EmptyMessage from '../General/Utilities/EmptyMessage';

export interface SavedPayloadListProps {
  savedPayloads: SavedPayload[],
  connections: Connection[],
  onDelete: (savedPayload: SavedPayload) => void,
  onOpen: (savedPayload: SavedPayload, connection: Connection) => void,
  onOpenInNewConnection: (savedPayload: SavedPayload) => void,
}

export default function SavedPayloadList({
  savedPayloads,
  connections,
  onDelete,
  onOpen,
  onOpenInNewConnection,
}: SavedPayloadListProps) {
  const popup = useContext(PopupContext);
  const [selectedPayload, setSelectedPayload] = useState<SavedPayload | undefined>();

  if (savedPayloads.length === 0) {
    return (
      <EmptyMessage heading="No Results">
        No saved payloads matched your query.
      </EmptyMessage>
    );
  }

  return (
    <List>
      {savedPayloads.map((savedPayload) => (
        <ListItem
          key={savedPayload.id}
          title={(
            <span tw="font-mono break-all">
              <TextLimit characters={50}>
                {savedPayload.name}
              </TextLimit>
            </span>
          )}
          isSelected={selectedPayload?.id === savedPayload.id}
          subtitle={(
            <span tw="font-mono break-all">
              <TextLimit characters={80}>
                {savedPayload.content}
              </TextLimit>
            </span>
          )}
          primaryClickActions={[
            ...connections.map((connection) => ({
              label: `Open in ${connection.name}`,
              onClick: () => onOpen(savedPayload, connection),
            })),
            ...(connections.length ? ['-'] : []),
            {
              label: 'Open in new connection',
              onClick: () => onOpenInNewConnection(savedPayload),
            },
          ]}
          secondaryClickActions={[
            {
              label: 'Edit',
              onClick: async () => {
                setSelectedPayload(savedPayload);

                await popup.push(
                  'Edit Payload ',
                  CreateEditPayloadConnected,
                  {
                    savedPayload,
                  },
                );

                setSelectedPayload(undefined);
              },
            },
            {
              label: 'Delete',
              onClick: async () => {
                setSelectedPayload(savedPayload);

                if (await popup.push<string>(
                  'Delete Payload',
                  PopupConfirmation,
                  {
                    message: 'Are you sure you would like to delete this payload?',
                  },
                )) {
                  onDelete(savedPayload);
                }

                setSelectedPayload(undefined);
              },
            },
          ]}
        />
      ))}
    </List>
  );
}
