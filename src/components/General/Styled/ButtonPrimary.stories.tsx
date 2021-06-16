import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import ButtonPrimary from './ButtonPrimary';

export default {
  title: 'Styled / Button Primary',
  component: ButtonPrimary,
} as Meta;

const Template: Story = (args) => (
  <ButtonPrimary {...args}>
    {args.children}
  </ButtonPrimary>
);

export const Primary = Template.bind({ });

Primary.args = {
  children: 'Button Text',
  disabled: false,
  onClick: action('Button click'),
};
