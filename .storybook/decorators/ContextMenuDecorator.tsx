import React from 'react';
import { ContextMenuProvider } from '../../src/providers/ContextMenuProvider';

export default function ContextMenuDecorator(
  component: any,
) {
  return (
    <ContextMenuProvider>
      {component()}
    </ContextMenuProvider>
  )
}
