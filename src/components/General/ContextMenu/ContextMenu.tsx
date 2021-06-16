import React from 'react';
import 'twin.macro';
import ContextMenuAction from '../../../providers/context-menu-action';

export type ContextMenuProps = {
  position: [number, number],
  actions: ContextMenuAction[],
  align: 'left' | 'right',
  close: () => void,
};

export default function ContextMenu({
  position,
  actions,
  align,
  close,
}: ContextMenuProps) {
  return (
    <div
      role="presentation"
      tw="absolute inset-0"
      onClick={() => close()}
      onContextMenu={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <div
        tw="flex flex-col absolute bg-white dark:bg-gray-850 dark:border dark:border-gray-700 rounded shadow w-56 overflow-hidden py-2"
        style={{
          left: `calc(${align === 'right' ? '-14rem' : '0px'} + ${position[0]}px)`,
          top: `${position[1]}px`,
        }}
      >
        {actions.map((action) => {
          if (action === '-') {
            return (
              <div
                key="-"
                tw="border-b my-1 border-gray-300 dark:border-gray-700"
              />
            );
          }

          if (typeof action === 'string') {
            return (
              <div
                key={action}
                tw="px-4 py-2 uppercase text-gray-500 text-xs font-semibold"
              >
                {action}
              </div>
            );
          }

          return (
            <button
              key={action.key || action.label}
              type="button"
              tw="px-4 py-1 hover:bg-gray-200 hover:dark:bg-gray-800 text-left text-sm text-gray-700 dark:text-gray-200"
              onClick={(event) => {
                event.stopPropagation();
                close();
                setTimeout(() => action?.onClick?.(event));
              }}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
