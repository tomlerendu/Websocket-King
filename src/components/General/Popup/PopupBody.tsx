import React, { ReactNode } from 'react';
import 'twin.macro';

export interface PopupBodyProps {
  children: ReactNode,
}

export default function PopupBody({
  children,
}: PopupBodyProps) {
  return (
    <div tw="p-4">
      {children}
    </div>
  );
}
