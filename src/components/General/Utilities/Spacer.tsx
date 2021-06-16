import React from 'react';
import tw from 'twin.macro';

export interface SpacerProps {
  size?: 'half' | 'default',
}

export default function Spacer({
  size,
}: SpacerProps) {
  return (
    <div
      css={[
        tw`w-full`,
        size === 'half' && tw`py-1`,
        (size === 'default' || !size) && tw`py-2`,
      ]}
    />
  );
}

Spacer.defaultProps = {
  size: 'default',
};
