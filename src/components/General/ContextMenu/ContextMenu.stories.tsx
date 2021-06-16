import React from 'react';
import 'twin.macro';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import ContextMenu, { ContextMenuProps } from './ContextMenu';

export default {
  title: 'Context Menu',
  component: ContextMenu,
  argTypes: {
    actions: {
      contorl: {
        type: 'object',
      },
    },
    position: {
      contorl: {
        type: 'object',
      },
    },
  },
  decorators: [
    (component, { args }) => (
      <>
        <div
          tw="absolute w-4 h-4 bg-red-500 rounded-full"
          style={{
            left: `calc(${args.position[0]}px - 0.5rem)`,
            top: `calc(${args.position[1]}px - 0.5rem)`,
          }}
        />
        {component()}
      </>
    ),
  ],
} as Meta;

const Template: Story<ContextMenuProps> = (args) => (
  <ContextMenu {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  actions: [
    { label: 'Action 1', onClick: action('Action 1 click') },
    { label: 'Action 2', onClick: action('Action 2 click') },
    { label: 'Action 3', onClick: action('Action 3 click') },
  ],
  position: [200, 200],
  close: action('Close triggered'),
};
