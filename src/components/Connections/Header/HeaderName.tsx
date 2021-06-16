import React, { useContext } from 'react';
import 'twin.macro';
import { PopupContext } from '../../../providers/PopupProvider';
import ConnectionValidators from '../../../models/connection/validator';
import PopupPrompt from '../../General/PopupPresets/PopupPrompt';

export interface HeaderNameProps {
  name: string,
  onNameChange: (name: string) => void,
}

export default function HeaderName({
  name,
  onNameChange,
}: HeaderNameProps) {
  const popup = useContext(PopupContext);

  return (
    <button
      type="button"
      tw="bg-blue-700 dark:bg-blue-800 hover:bg-blue-600 hover:dark:bg-blue-700 px-2 py-1 font-semibold text-xs text-white rounded"
      onClick={async () => {
        const newName = await popup.push<string>(
          'Rename Connection',
          PopupPrompt,
          {
            label: 'Connection Name',
            submitLabel: 'Rename',
            defaultValue: name,
            yupValidator: ConnectionValidators.name,
            maxLength: ConnectionValidators.nameLength,
          },
        );

        if (newName?.length) {
          onNameChange(newName);
        }
      }}
    >
      {name}
    </button>
  );
}
