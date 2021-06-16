import React, { useContext, useState } from 'react';
import 'twin.macro';
import { FiEdit3, GoPlus } from 'react-icons/all';
import SavedPayload from '../../models/saved-payload';
import EmptyMessage from '../General/Utilities/EmptyMessage';
import SavedPayloadList from './SavedPayloadList';
import Heading from '../General/Utilities/Heading';
import Project from '../../models/project';
import Connection from '../../models/connection';
import { PopupContext } from '../../providers/PopupProvider';
import ButtonSecondary from '../General/Styled/ButtonSecondary';
import SidebarSearch from './SidebarSearch';
import useArrayFilter from '../../hooks/useArrayFilter';
import EditProjectReduxWrapper from '../EditProject/EditProjectReduxWrapper';
import { tabCreateFromSavedPayload } from '../../redux/actions/tabs';
import { savedPayloadRemove } from '../../redux/actions/saved-payloads';
import CreateEditPayloadConnected from '../CreateEditPayload/CreateEditPayloadConnected';
import { connectionCreateFromSavedPayload } from '../../redux/actions/connections';

export interface SidebarProps {
  savedPayloads: SavedPayload[],
  connections: Connection[],
  project: Project,
  onCreateConnectionFromSavedPayload: typeof connectionCreateFromSavedPayload,
  onCreateTabFromSavedPayload: typeof tabCreateFromSavedPayload,
  onSavedPayloadDelete: typeof savedPayloadRemove,
}

export default function Sidebar({
  savedPayloads,
  connections,
  project,
  onCreateConnectionFromSavedPayload,
  onCreateTabFromSavedPayload,
  onSavedPayloadDelete,
}: SidebarProps) {
  const popup = useContext(PopupContext);
  const [query, setQuery] = useState<string>('');

  const filteredSavedPayloads = useArrayFilter<SavedPayload>(
    savedPayloads,
    query,
    (payload) => payload.name,
  );

  const openCreatePayload = () => {
    popup.push(
      'Create Payload',
      CreateEditPayloadConnected,
      { project },
    );
  };

  return (
    <div tw="flex flex-col w-full bg-white dark:bg-gray-850 rounded-r-lg border border-gray-250 dark:border-gray-700 border-l-0 overflow-hidden">
      <div tw="bg-gray-200 dark:bg-gray-900 border-b dark:border-gray-800 py-2 pl-4 pr-2">
        <div tw="flex items-center justify-between pb-1">
          <span tw="font-semibold select-text text-gray-900 dark:text-gray-100">
            {project.name}
          </span>
          <ButtonSecondary
            type="button"
            tw="p-2"
            title="Edit Project"
            onClick={() => popup.push(
              'Edit Project',
              EditProjectReduxWrapper,
              { project },
            )}
          >
            <FiEdit3
              tw="self-center"
            />
          </ButtonSecondary>
        </div>
        <div tw="mr-2">
          <SidebarSearch
            onChange={(newQuery) => setQuery(newQuery)}
            value={query}
          />
        </div>
      </div>
      <div
        tw="flex-1 relative"
      >
        <div
          tw="absolute inset-0 overflow-y-auto flex flex-col"
          data-tour="saved-payloads"
        >
          <Heading
            buttons={[
              {
                icon: <GoPlus />,
                alt: 'Create',
                onClick: () => openCreatePayload(),
              },
            ]}
          >
            Saved Payloads
          </Heading>
          {savedPayloads.length > 0 && (
            <SavedPayloadList
              savedPayloads={filteredSavedPayloads}
              connections={connections}
              onDelete={(savedPayload) => onSavedPayloadDelete(savedPayload)}
              onOpen={(savedPayload, connection) => onCreateTabFromSavedPayload(
                connection,
                savedPayload,
              )}
              onOpenInNewConnection={(savedPayload) => onCreateConnectionFromSavedPayload(
                savedPayload,
              )}
            />
          )}
          {savedPayloads.length === 0 && (
            <EmptyMessage
              heading="No Saved Payloads"
              buttonText="Create"
              buttonOnClick={() => openCreatePayload()}
            >
              Create one or use the &quot;Save As&quot; button on a connection.
            </EmptyMessage>
          )}
        </div>
      </div>
    </div>
  );
}
