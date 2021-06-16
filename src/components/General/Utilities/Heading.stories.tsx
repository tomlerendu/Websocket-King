import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { MdAccessTime, MdAddLocation } from 'react-icons/md';
import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Utilities / Heading',
  component: Heading,
  argTypes: {
    buttons: { control: 'object' },
  },
} as Meta;

const Template: Story<HeadingProps> = (args) => (
  <Heading {...args}>
    {args.children}
  </Heading>
);

export const WithoutButtons = Template.bind({ });

WithoutButtons.args = {
  children: 'Heading',
  buttons: [],
};

export const WithButtons = Template.bind({ });

WithButtons.args = {
  children: 'Heading',
  buttons: [
    {
      icon: <MdAccessTime />,
      alt: 'Clock',
      onClick: action('Clock click'),
    },
    {
      icon: <MdAddLocation />,
      alt: 'Location',
      onClick: action('Location click'),
    },
  ],
};
