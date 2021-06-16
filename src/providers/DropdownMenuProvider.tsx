import React, {
  createContext,
  ReactNode,
  useContext,
} from 'react';
import ContextMenuAction from './context-menu-action';
import { ContextMenuContext } from './ContextMenuProvider';

interface Context {
  openForElement: (element: HTMLElement, actions: ContextMenuAction[]) => void,
  close: () => void,
}

const defaultContext: Context = {
  openForElement: () => null,
  close: () => null,
};

export const DropdownMenuContext = createContext<Context>(defaultContext);

export interface DropdownMenuProviderProps {
  children: ReactNode,
}

export function DropdownMenuProvider({
  children,
}: DropdownMenuProviderProps) {
  const contextMenu = useContext(ContextMenuContext);

  const openForElement = async (element: HTMLElement, actions: ContextMenuAction[]) => {
    const boundingRect = element.getBoundingClientRect();
    await contextMenu.open(
      [boundingRect.left + element.clientWidth, boundingRect.bottom],
      actions,
      'right',
    );
  };

  const close = () => {
    contextMenu.close();
  };

  return (
    <DropdownMenuContext.Provider value={{
      openForElement,
      close,
    }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}
