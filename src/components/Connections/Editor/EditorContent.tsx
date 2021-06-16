import React, { useEffect, useState } from 'react';
import 'twin.macro';
import Tab from '../../../models/tab';
import SavedPayload from '../../../models/saved-payload';
import Connection, { ConnectionSocketStatus } from '../../../models/connection';
import ButtonPrimary from '../../General/Styled/ButtonPrimary';
import ButtonSecondary from '../../General/Styled/ButtonSecondary';
import Editor from '../../General/Editor/Editor';

export interface EditorContentProps {
  connection: Connection
  selectedTab: Tab,
  selectedSavedPayload: SavedPayload | undefined,
  onSave: (tab: Tab) => void,
  onSaveAs: (tab: Tab) => void,
  onSend: (content: string) => void,
  onTabContentChanged: (tab: Tab, content: string) => void,
}

export default function EditorContent({
  connection,
  selectedTab,
  selectedSavedPayload,
  onSave,
  onSaveAs,
  onSend,
  onTabContentChanged,
}: EditorContentProps) {
  const [content, setContent] = useState<string>(selectedTab?.content);

  useEffect(
    () => {
      if (selectedTab) {
        setContent(selectedTab.content);
      }
    },
    [selectedTab, selectedSavedPayload],
  );

  if (!selectedTab) {
    return null;
  }

  return (
    <>
      <label>
        <span tw="sr-only">Payload</span>
        <div tw="mt-2 px-4">
          <Editor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            onBlur={() => onTabContentChanged(selectedTab, content)}
            minLines={3}
            maxLines={6}
            placeholder="Payload"
          />
        </div>
      </label>
      <div tw="flex my-2 px-4">
        <ButtonPrimary
          type="button"
          disabled={connection.socketStatus !== ConnectionSocketStatus.Connected}
          tw="py-1 px-4 mr-2 rounded"
          onClick={() => onSend(selectedTab.content)}
        >
          Send
        </ButtonPrimary>
        {selectedSavedPayload && selectedTab.content === selectedSavedPayload.content && (
          <button
            type="button"
            tw="px-4 text-gray-400 cursor-default text-xs"
            disabled
          >
            Saved
          </button>
        )}
        {selectedSavedPayload && selectedTab.content !== selectedSavedPayload.content && (
          <>
            <ButtonSecondary
              type="button"
              tw="px-4 rounded text-xs"
              onClick={() => onSave(selectedTab)}
            >
              Save
            </ButtonSecondary>
            <ButtonSecondary
              type="button"
              tw="px-4 rounded text-xs"
              onClick={() => onTabContentChanged(selectedTab, selectedSavedPayload.content)}
            >
              Discard Changes
            </ButtonSecondary>
          </>
        )}
        {selectedTab.content?.length > 0 && (
          <ButtonSecondary
            type="button"
            tw="px-4 rounded text-xs"
            onClick={() => onSaveAs(selectedTab)}
          >
            Save As
          </ButtonSecondary>
        )}
      </div>
    </>
  );
}
