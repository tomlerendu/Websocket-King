import React, { useState } from 'react';
import tw from 'twin.macro';
import { format } from 'date-fns';
import {
  FaRegCopy, FaRegEdit, FaArrowUp, FaArrowDown,
} from 'react-icons/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import { MdDone, RiInformationLine } from 'react-icons/all';
import Event, { EventType } from '../../../models/event';
import EventRowPayload from './EventRowPayload';

export interface EventRowProps {
  event: Event,
  shouldFormatPayload: boolean,
  onOpenInNewTab: () => void,
  layout: 'narrow' | 'wide',
}

export default function EventRow({
  event,
  shouldFormatPayload,
  onOpenInNewTab,
  layout,
}: EventRowProps) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  return (
    <div
      key={event.id}
      className="group"
      css={[
        tw`max-w-full flex flex-row justify-between py-1 px-4 hover:bg-gray-100 hover:dark:bg-gray-800`,
        layout === 'narrow' && tw`flex-wrap`,
      ]}
    >
      <div tw="order-1 flex flex-shrink-0">
        <div tw="text-gray-400 dark:text-gray-600 font-mono">
          {format(new Date(event.timestamp), 'HH:mm ss.SS')}
        </div>
        {event.type === EventType.Sent && (
          <div tw="text-green-500 dark:text-green-200 ml-2 p-1 text-xs">
            <FaArrowUp title="Sent payload" />
          </div>
        )}
        {event.type === EventType.Received && (
          <div tw="text-red-500 dark:text-red-200 ml-2 p-1 text-xs">
            <FaArrowDown title="Received payload" />
          </div>
        )}
        {event.type === EventType.Meta && (
          <div tw="text-gray-500 dark:text-gray-700 ml-2 p-1 text-xs">
            <RiInformationLine title="Information" />
          </div>
        )}
      </div>
      <div
        css={[
          tw`flex-grow min-w-0 font-mono`,
          layout === 'narrow' && tw`order-4 w-full`,
          layout === 'wide' && tw`order-3 ml-4`,
          event.type === EventType.Sent && tw`text-green-900 dark:text-green-200`,
          event.type === EventType.Received && tw`text-red-900 dark:text-red-200`,
          event.type === EventType.Meta && tw`text-gray-900 dark:text-gray-200`,
        ]}
      >
        <pre tw="whitespace-pre-wrap break-words">
          <EventRowPayload
            event={event}
            shouldFormatPayload={shouldFormatPayload}
          />
        </pre>
      </div>
      <div
        css={[
          tw`invisible group-hover:visible text-gray-400`,
          layout === 'narrow' && tw`order-3`,
          layout === 'wide' && tw`order-4`,
        ]}
      >
        <CopyToClipboard
          text={event.payload}
          onCopy={() => {
            if (!copiedToClipboard) {
              setCopiedToClipboard(true);
              setTimeout(() => setCopiedToClipboard(false), 2000);
            }
          }}
        >
          <button
            type="button"
            css={[
              tw`ml-2 hover:text-gray-600`,
              copiedToClipboard && tw`cursor-default`,
            ]}
          >
            {!copiedToClipboard && <FaRegCopy title="Copy to Clipboard" />}
            {copiedToClipboard && <MdDone title="Copied to Clipboard" />}
          </button>
        </CopyToClipboard>
        {event.type !== EventType.Meta && (
          <button
            type="button"
            tw="ml-2 hover:text-gray-600"
            onClick={() => onOpenInNewTab()}
          >
            <FaRegEdit title="Open in Editor" />
          </button>
        )}
      </div>
    </div>
  );
}
