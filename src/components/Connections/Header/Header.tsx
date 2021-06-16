import React, { useContext, useState } from 'react';
import tw from 'twin.macro';
import { MdClose } from 'react-icons/md';
import { GoDash, RiSettings3Line } from 'react-icons/all';
import Connection, { ConnectionSocketStatus } from '../../../models/connection';
import HeaderName from './HeaderName';
import ButtonSecondary from '../../General/Styled/ButtonSecondary';
import ButtonPrimary from '../../General/Styled/ButtonPrimary';
import { PopupContext } from '../../../providers/PopupProvider';
import EditConnection from '../../EditConnection/EditConnection';
import { socketConnect, socketDisconnect } from '../../../redux/actions/connection-sockets';
import {
  connectionDisconnectSocketAndRemove,
  connectionMinimize,
  connectionUpdateAutoReconnect,
  connectionUpdateName,
  connectionUpdateProtocols,
  connectionUpdateSocketUrl,
} from '../../../redux/actions/connections';

export interface HeaderProps {
  onWebSocketUrlChange: typeof connectionUpdateSocketUrl,
  onWebSocketNameChange: typeof connectionUpdateName,
  onWebSocketProtocolsChange: typeof connectionUpdateProtocols,
  onWebSocketAutoReconnectChange: typeof connectionUpdateAutoReconnect,
  onWebSocketConnect: typeof socketConnect,
  onWebSocketDisconnect: typeof socketDisconnect,
  onClose: typeof connectionDisconnectSocketAndRemove,
  onMinimize: typeof connectionMinimize,
  connection: Connection,
}

export default function Header({
  onWebSocketUrlChange,
  onWebSocketNameChange,
  onWebSocketProtocolsChange,
  onWebSocketAutoReconnectChange,
  onWebSocketConnect,
  onWebSocketDisconnect,
  onClose,
  onMinimize,
  connection,
}: HeaderProps) {
  const popup = useContext(PopupContext);
  const [socketUrlInputFocused, setSocketUrlInputFocused] = useState<boolean>(false);
  const [connectionOptionsPopupOpen, setConnectionOptionsPopupOpen] = useState<boolean>(false);

  const connectOrDisconnectClick = () => {
    if (connection.socketStatus === ConnectionSocketStatus.Disconnected) {
      onWebSocketConnect(connection);
    }

    if (connection.socketStatus === ConnectionSocketStatus.Connected) {
      onWebSocketDisconnect(connection);
    }
  };

  return (
    <div tw="w-full bg-gray-200 dark:bg-gray-900">
      <div tw="flex flex-row p-2 items-center">
        <div tw="flex-none pl-2 pr-4">
          <HeaderName
            name={connection.name}
            onNameChange={(name) => onWebSocketNameChange(connection, name)}
          />
        </div>
        <div tw="flex-grow">
          <div
            data-tour="connection-url"
            css={[
              tw`flex flex-row flex-grow overflow-hidden rounded-lg border-2 dark:border-gray-700 h-10`,
              socketUrlInputFocused && tw`border-gray-400 dark:border-gray-600`,
              connection.socketStatus !== ConnectionSocketStatus.Disconnected && tw`bg-gray-100 dark:bg-gray-900`,
              connection.socketStatus === ConnectionSocketStatus.Disconnected && tw`bg-white dark:bg-gray-850`,
            ]}
          >
            <div
              css={[
                tw`flex flex-row flex-grow items-center`,
                connection.socketStatus !== ConnectionSocketStatus.Disconnected && tw`pointer-events-none`,
              ]}
            >
              <label tw="flex-grow w-full">
                <span tw="sr-only">WebSocket URL</span>
                <input
                  type="text"
                  placeholder="WebSocket URL"
                  tw="w-full py-1 pl-2 pr-1 bg-transparent text-gray-900 dark:text-gray-100"
                  onChange={(event) => onWebSocketUrlChange(
                    connection,
                    (event.target as HTMLInputElement).value,
                  )}
                  onFocus={() => setSocketUrlInputFocused(true)}
                  onBlur={() => setSocketUrlInputFocused(false)}
                  value={connection.socketUrl}
                />
              </label>
              <ButtonSecondary
                onClick={async () => {
                  setConnectionOptionsPopupOpen(true);
                  await popup.push(
                    `${connection.name} Connection Options`,
                    EditConnection,
                    {
                      connection,
                      onWebSocketProtocolsChange,
                      onWebSocketAutoReconnectChange,
                    },
                  );
                  setConnectionOptionsPopupOpen(false);
                }}
                title="Connection Options"
                css={[
                  tw`m-1 h-6 flex-none p-1 rounded`,
                  connectionOptionsPopupOpen && tw`bg-gray-400`,
                  connection.socketStatus !== ConnectionSocketStatus.Disconnected && tw`text-gray-300 dark:text-gray-600`,
                  connection.socketStatus === ConnectionSocketStatus.Disconnected && tw`text-gray-600 dark:text-gray-300`,
                ]}
                type="button"
              >
                <RiSettings3Line tw="text-sm" />
              </ButtonSecondary>
            </div>
            <ButtonPrimary
              type="button"
              onClick={() => connectOrDisconnectClick()}
              disabled={
                [
                  ConnectionSocketStatus.PendingReconnection,
                  ConnectionSocketStatus.Pending,
                ].includes(connection.socketStatus)
                || !connection.socketUrl.length
              }
              css={[tw`px-4 mr-2 my-1 rounded`]}
            >
              {connection.socketStatus === ConnectionSocketStatus.Disconnected && 'Connect'}
              {connection.socketStatus === ConnectionSocketStatus.Pending && 'Connecting'}
              {connection.socketStatus === ConnectionSocketStatus.Connected && 'Disconnect'}
              {connection.socketStatus === ConnectionSocketStatus.PendingReconnection && `Reconnecting in ${connection.socketSecondsUntilReconnect}`}
            </ButtonPrimary>
          </div>
        </div>
        <div tw="flex-none h-8 ml-2">
          <ButtonSecondary
            title="Minimize"
            tw="px-2 h-8"
            onClick={() => onMinimize(connection)}
            type="button"
          >
            <GoDash />
          </ButtonSecondary>
          <ButtonSecondary
            title="Close"
            tw="px-2 h-8"
            onClick={() => onClose(connection)}
            type="button"
          >
            <MdClose />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
