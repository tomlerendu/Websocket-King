import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Link from './Link';

export default {
  title: 'Styled / Link',
  component: Link,
  argTypes: { },
} as Meta;

const Template: Story = (args) => (
  <Link href="https://google.com">
    {args.children}
  </Link>
);

export const Primary = Template.bind({ });

Primary.args = {
  children: 'Link Text',
};
