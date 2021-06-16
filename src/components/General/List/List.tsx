import React, { ReactNode } from 'react';

export interface ListProps {
  children: ReactNode,
}

export default function List({
  children,
}: ListProps) {
  return (
    <ul>
      {children}
    </ul>
  );
}
