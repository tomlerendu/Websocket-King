import React, { createContext, ReactNode, useState } from 'react';
import { Portal } from 'react-portal';
import Deferred from '../helpers/deferred';
import ContextMenu from '../components/General/ContextMenu/ContextMenu';
import ContextMenuAction from './context-menu-action';

interface Context {
  openForMouseEvent: (event: React.MouseEvent, actions: ContextMenuAction[], align?: 'left' | 'right') => void,
  open: (position: [number, number], actions: ContextMenuAction[], align?: 'left' | 'right') => void,
  close: () => void,
  position: [number, number] | undefined,
  align: 'left' | 'right' | undefined,
  actions: ContextMenuAction[] | undefined,
}

const defaultContext: Context = {
  openForMouseEvent: () => null,
  open: () => null,
  close: () => null,
  position: undefined,
  align: 'left',
  actions: undefined,
};

export const ContextMenuContext = createContext<Context>(defaultContext);

export interface ContextMenuProviderProps {
  children: ReactNode,
}

export function ContextMenuProvider({
  children,
}: ContextMenuProviderProps) {
  const [position, setPosition] = useState<[number, number] | undefined>();
  const [align, setAlign] = useState<'left' | 'right' | undefined>();
  const [actions, setActions] = useState<ContextMenuAction[] | undefined>();
  const [promiseResolver, setPromiseResolver] = useState<any | undefined>();

  const open = async (
    newPosition: [number, number],
    newActions: ContextMenuAction[],
    newAlign: 'left' | 'right' = 'left',
  ) => {
    const deferred = new Deferred();

    setPosition(newPosition);
    setAlign(newAlign);
    setActions(newActions);
    setPromiseResolver(() => () => deferred.resolve?.());

    await deferred.promise;
  };

  const openForMouseEvent = async (
    event: React.MouseEvent,
    newActions: ContextMenuAction[],
    newAlign: 'left' | 'right' = 'left',
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await open(
      [event.clientX, event.clientY],
      newActions,
      newAlign,
    );
  };

  const close = () => {
    promiseResolver();

    setPosition(undefined);
    setAlign(undefined);
    setActions(undefined);
    setPromiseResolver(undefined);
  };

  return (
    <ContextMenuContext.Provider value={{
      openForMouseEvent,
      open,
      close,
      position,
      align,
      actions,
    }}
    >
      {children}
      {position && actions && (
        <Portal>
          <ContextMenu
            position={position!}
            align={align!}
            actions={actions!}
            close={() => close()}
          />
        </Portal>
      )}
    </ContextMenuContext.Provider>
  );
}
