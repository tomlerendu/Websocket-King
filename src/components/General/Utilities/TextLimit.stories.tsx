import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TextLimit, { TextLimitProps } from './TextLimit';

export default {
  title: 'Utilities / Text Limit',
  component: TextLimit,
} as Meta;

const Template: Story<TextLimitProps> = (args) => (
  <TextLimit {...args}>{args.children}</TextLimit>
);

export const ShortText = Template.bind({ });

ShortText.args = {
  characters: 50,
  children: 'Short text',
};

export const LongText = Template.bind({ });

LongText.args = {
  characters: 100,
  children: 'Long text. Long text. Long text. Long text. Long text. Long text. Long text. Long text.',
};

export const ShortTextCut = Template.bind({ });

ShortTextCut.args = {
  characters: 8,
  children: 'Short text',
};

export const LongTextCut = Template.bind({ });

LongTextCut.args = {
  characters: 50,
  children: 'Long text. Long text. Long text. Long text. Long text. Long text. Long text. Long text.',
};
