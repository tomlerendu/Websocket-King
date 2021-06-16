import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import EmptyMessage, { EmptyMessageProps } from './EmptyMessage';

export default {
  title: 'Utilities / Empty Message',
  component: EmptyMessage,
  argTypes: { },
} as Meta;

const Template: Story<EmptyMessageProps> = (args) => (
  <EmptyMessage {...args}>
    {args.children}
  </EmptyMessage>
);

export const Primary = Template.bind({ });

Primary.args = {
  heading: 'Title',
  children: 'Empty message content. Empty message content.',
};
