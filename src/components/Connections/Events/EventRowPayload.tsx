import React from 'react';
import Event, { EventFormat } from '../../../models/event';

export interface EventRowPayloadPropTypes {
  event: Event,
  shouldFormatPayload: boolean,
}

export default function EventRowPayload({
  event,
  shouldFormatPayload,
}: EventRowPayloadPropTypes) {
  if (shouldFormatPayload && event.format === EventFormat.Json) {
    return (
      <>
        {JSON.stringify(
          JSON.parse(event.payload),
          null,
          2,
        )}
      </>
    );
  }

  return <>{event.payload}</>;
}
