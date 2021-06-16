import { EventFormat } from '../models/event';

const isJson = (payload: string): boolean => {
  try {
    JSON.parse(payload);
  } catch (error) {
    return false;
  }

  return true;
};

const detectPayloadFormat = (payload: string) => (
  isJson(payload)
    ? EventFormat.Json
    : EventFormat.Unknown
);

export default detectPayloadFormat;
