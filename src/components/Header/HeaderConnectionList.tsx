import React, { useContext, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FaCaretDown, GoPlus } from 'react-icons/all';
import tw from 'twin.macro';
import Connection from '../../models/connection';
import ConnectionValidators from '../../models/connection/validator';
import Window from '../../models/window';
import { PopupContext } from '../../providers/PopupProvider';
import { ContextMenuContext } from '../../providers/ContextMenuProvider';
import PopupPrompt from '../General/PopupPresets/PopupPrompt';
import ButtonSecondary from '../General/Styled/ButtonSecondary';
import { DropdownMenuContext } from '../../providers/DropdownMenuProvider';

export interface HeaderConnectionListProps {
  windowConnections: Connection[],
  projectConnections: Connection[],
  windows: Window[],
  onToggle: (connection: Connection) => void,
  onRename: (connection: Connection, name: string) => void,
  onClose: (connection: Connection) => void,
  onCreate: () => void,
  onClearClosedWindows: () => void,
  onReassignWindow: (window: Window) => void,
}

export default function HeaderConnectionList({
  windowConnections,
  projectConnections,
  windows,
  onToggle,
  onRename,
  onClose,
  onCreate,
  onClearClosedWindows,
  onReassignWindow,
}: HeaderConnectionListProps) {
  const popup = useContext(PopupContext);
  const contextMenu = useContext(ContextMenuContext);
  const dropdownMenu = useContext(DropdownMenuContext);
  const [closedTabsButtonActive, setClosedTabsButtonActive] = useState<boolean>(false);

  return (
    <div
      tw="flex items-center"
    >
      <div tw="flex items-center pr-4 uppercase text-gray-600 dark:text-gray-400 font-semibold text-xs">
        Connections
      </div>
      <div tw="flex flex-row flex-wrap mt-1">
        {windowConnections.map((connection) => (
          <button
            type="button"
            key={connection.id}
            onClick={() => onToggle(connection)}
            onContextMenu={(event) => contextMenu.openForMouseEvent(
              event,
              [
                {
                  label: connection.maximized ? 'Minimize' : 'Maximize',
                  onClick: () => onToggle(connection),
                },
                {
                  label: 'Rename',
                  onClick: async () => {
                    const name = await popup.push<string>(
                      'Rename Connection',
                      PopupPrompt,
                      {
                        label: 'Connection Name',
                        submitLabel: 'Rename',
                        defaultValue: connection.name,
                        yupValidator: ConnectionValidators.name,
                        maxLength: ConnectionValidators.nameLength,
                      },
                    );

                    if (name?.length) {
                      onRename(connection, name);
                    }
                  },
                },
                {
                  label: 'Close',
                  onClick: () => onClose(connection),
                },
              ],
            )}
            css={[
              tw`mb-1 mr-1 px-4 py-1 flex items-center cursor-pointer text-sm font-semibold rounded-lg`,
              connection.maximized && tw`bg-blue-700 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-700 text-white`,
              !connection.maximized && tw`bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 text-blue-800 dark:text-gray-100`,
            ]}
            title={connection.maximized ? 'Minimize connection' : 'Maximize Connection'}
          >
            <span>{connection.name}</span>
          </button>
        )) }
        <ButtonSecondary
          type="button"
          tw="rounded-lg p-2 mb-1"
          onClick={() => onCreate()}
          title="New Tab"
        >
          <GoPlus />
        </ButtonSecondary>
        {!!windows.length && (
          <ButtonSecondary
            type="button"
            css={[
              tw`rounded-lg p-2 mb-1`,
              closedTabsButtonActive && tw`bg-gray-300 dark:bg-gray-700`,
            ]}
            onClick={async (event) => {
              setClosedTabsButtonActive(true);
              await dropdownMenu.openForElement(
                event.currentTarget as HTMLElement,
                [
                  'Recently closed windows',
                  ...windows.map((window) => {
                    const connectionCount = projectConnections
                      .filter((connection) => connection.windowId === window.id)
                      .length;

                    return {
                      key: window.id,
                      label: `${connectionCount} ${connectionCount === 1 ? 'connection' : 'connections'} `
                        + ` — ${window.closedAt ? format(parseISO(window.closedAt), 'M LLLL \'at\' H:mm') : 'unknown'}`,
                      onClick: () => onReassignWindow(window),
                    };
                  }),
                  '-',
                  {
                    label: 'Clear all',
                    onClick: () => onClearClosedWindows(),
                  },
                ],
              );
              setClosedTabsButtonActive(false);
            }}
            title="Closed Windows"
          >
            <FaCaretDown />
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
}
