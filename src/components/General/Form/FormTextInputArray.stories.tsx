import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FormikDecorator, { FormikDecoratorProps } from '../../../../.storybook/decorators/FormikDecorator';
import FormTextInputArray, { FormTextInputArrayProps } from './FormTextInputArray';

export default {
  title: 'Form / Text Input Array',
  component: FormTextInputArray,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: Story<FormTextInputArrayProps & FormikDecoratorProps> = (args) => (
  <FormTextInputArray {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  name: 'test',
  addItemCta: 'Add New Item',
  initialValues: {
    test: [
      { id: 'a', value: 'Test 1' },
      { id: 'b', value: 'Test 2' },
    ],
  },
};
