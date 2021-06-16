import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import ButtonSecondary from './ButtonSecondary';

export default {
  title: 'Styled / Button Secondary',
  component: ButtonSecondary,
} as Meta;

const Template: Story = (args) => (
  <ButtonSecondary {...args}>
    {args.children}
  </ButtonSecondary>
);

export const Primary = Template.bind({ });

Primary.args = {
  children: 'Button Text',
  disabled: false,
  onClick: action('Button click'),
};
