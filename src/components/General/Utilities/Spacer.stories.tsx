import React from 'react';
import 'twin.macro';
import { Story, Meta } from '@storybook/react/types-6-0';
import Spacer, { SpacerProps } from './Spacer';

export default {
  title: 'Utilities / Spacer',
  component: Spacer,
  decorators: [
    (story) => <div tw="w-full bg-gray-300">{story()}</div>,
  ],
} as Meta;

const Template: Story<SpacerProps> = (args) => (
  <Spacer {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  size: 'default',
};
