import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import List, { ListProps } from './List';
import ContextMenuDecorator from '../../../../.storybook/decorators/ContextMenuDecorator';
import DropdownMenuDecorator from '../../../../.storybook/decorators/DropdownMenuDecorator';
import * as ListItem from './ListItem.stories';

export default {
  title: 'List / List',
  component: List,
  decorators: [
    DropdownMenuDecorator,
    ContextMenuDecorator,
  ],
} as Meta;

const Template: Story<ListProps> = (args) => (
  <List>
    {args.children}
  </List>
);

export const Primary = Template.bind({ });

Primary.args = {
  children: (
    <>
      <ListItem.Primary {...ListItem.Primary.args as any} />
      <ListItem.WithLeftClickActions {...ListItem.WithLeftClickActions.args as any} />
      <ListItem.WithRightClickActions {...ListItem.WithRightClickActions.args as any} />
      <ListItem.WithSingleLeftClickAction {...ListItem.WithSingleLeftClickAction.args as any} />
      <ListItem.WithSubtitle {...ListItem.WithSubtitle.args as any} />
    </>
  ),
};
