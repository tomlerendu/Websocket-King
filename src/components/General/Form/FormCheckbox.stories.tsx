import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FormCheckbox, { FormCheckboxProps } from './FormCheckbox';
import FormikDecorator, { FormikDecoratorProps } from '../../../../.storybook/decorators/FormikDecorator';

export default {
  title: 'Form / Checkbox',
  component: FormCheckbox,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: Story<FormCheckboxProps & FormikDecoratorProps> = (args) => (
  <FormCheckbox {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  name: 'test',
  description: 'Test description',
  initialValues: {
    test: true,
  },
};
