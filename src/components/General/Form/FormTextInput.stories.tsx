import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FormikDecorator, { FormikDecoratorProps } from '../../../../.storybook/decorators/FormikDecorator';
import FormTextInput, { FormTextInputProps } from './FormTextInput';

export default {
  title: 'Form / Text Input',
  component: FormTextInput,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: Story<FormTextInputProps & FormikDecoratorProps> = (args) => (
  <FormTextInput {...args} />
);

export const Filled = Template.bind({ });

Filled.args = {
  name: 'test',
  maxLength: 20,
  initialValues: {
    test: 'Value',
  },
};

export const Placeholder = Template.bind({ });

Placeholder.args = {
  name: 'test',
  maxLength: 50,
  placeholder: 'Placeholder',
  initialValues: {
    test: '',
  },
};
