import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import ListItem, { ListItemProps } from './ListItem';
import ContextMenuDecorator from '../../../../.storybook/decorators/ContextMenuDecorator';
import DropdownMenuDecorator from '../../../../.storybook/decorators/DropdownMenuDecorator';

export default {
  title: 'List / List Item',
  component: ListItem,
  decorators: [
    DropdownMenuDecorator,
    ContextMenuDecorator,
  ],
} as Meta;

const Template: Story<ListItemProps> = (args) => (
  <ListItem {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  title: 'List item title',
};

export const WithSubtitle = Template.bind({ });

WithSubtitle.args = {
  ...Primary.args,
  subtitle: 'List item subtitle',
};

export const WithSingleLeftClickAction = Template.bind({ });

WithSingleLeftClickAction.args = {
  ...Primary.args,
  onClick: action('Single left click'),
};

export const WithLeftClickActions = Template.bind({ });

WithLeftClickActions.args = {
  ...Primary.args,
  primaryClickActions: [
    { label: 'Action 1', onClick: action('Action 1 click') },
    { label: 'Action 2', onClick: action('Action 2 click') },
  ],
};

export const WithRightClickActions = Template.bind({ });

WithRightClickActions.args = {
  ...Primary.args,
  secondaryClickActions: [
    { label: 'Action 1', onClick: action('Action 1 click') },
    { label: 'Action 2', onClick: action('Action 2 click') },
  ],
};
