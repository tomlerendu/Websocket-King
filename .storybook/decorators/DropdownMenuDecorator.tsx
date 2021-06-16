import React from 'react';
import { DropdownMenuProvider } from '../../src/providers/DropdownMenuProvider';

export default function DropdownMenuDecorator(
  component: any,
) {
  return (
    <DropdownMenuProvider>
      {component()}
    </DropdownMenuProvider>
  )
}
