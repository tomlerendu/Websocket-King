import React from 'react';

export interface TextLimitProps {
  characters: number,
  children: string,
}

export default function TextLimit({
  characters,
  children,
}: TextLimitProps) {
  return (
    <>
      {
        children.length > characters
          ? `${children.substring(0, characters)}…`
          : children
      }
    </>
  );
}
