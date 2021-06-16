import React, {
  createContext,
  createElement,
  ReactElement,
  ReactNode,
} from 'react';
import { Portal } from 'react-portal';
import PopupManager from '../types/UserInterface/PopupManager';
import useStack from '../hooks/useStack';
import Deferred from '../helpers/deferred';
import Popup from '../components/General/Popup/Popup';

type StackComponent = {
  title: string,
  component: ReactElement,
  onPopResolver: any,
};

export const PopupContext = createContext<PopupManager>({
  visible: false,
  title: null,
  component: null,
  popToRoot: () => null,
  push: async () => null as any,
  pop: () => null,
});

export interface PopupProviderProps {
  children: ReactNode,
}

export function PopupProvider({
  children,
}: PopupProviderProps) {
  const stack = useStack<StackComponent>();

  const push = async <T extends any>(
    title: string,
    component: any,
    componentProps?: Object,
  ): Promise<T> => {
    (document.activeElement as HTMLElement)?.blur?.();

    const deferred = new Deferred<T>();

    stack.push({
      title,
      component: createElement(
        component,
        { ...componentProps },
      ),
      onPopResolver: (value: any) => deferred.resolve!(value),
    });

    return deferred.promise;
  };

  const pop = (value?: any) => {
    stack.pop().onPopResolver(value);
  };

  const popToRoot = () => {
    [...stack.items]
      .reverse()
      .forEach((item) => item.onPopResolver());
    stack.clear();
  };

  const title = [...stack.items]
    .reverse()
    .map((component) => component.title);

  const manager: PopupManager = {
    visible: !stack.isEmpty(),
    component: stack.items[0]?.component,
    title,
    popToRoot,
    push,
    pop,
  };

  return (
    <PopupContext.Provider value={manager}>
      {children}
      {manager.visible && (
        <Portal>
          <Popup
            popup={manager}
          />
        </Portal>
      )}
    </PopupContext.Provider>
  );
}
