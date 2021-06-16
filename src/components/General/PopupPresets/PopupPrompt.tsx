import React, { useContext } from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PopupButtons from '../Popup/PopupButtons';
import { PopupContext } from '../../../providers/PopupProvider';
import FormTextInput from '../Form/FormTextInput';
import PopupBody from '../Popup/PopupBody';

export interface PopupPromptProps {
  label: string,
  submitLabel: string,
  defaultValue?: string,
  yupValidator?: yup.Schema<any>,
  maxLength?: number,
}

export default function PopupPrompt({
  label,
  submitLabel,
  defaultValue,
  yupValidator,
  maxLength,
}: PopupPromptProps) {
  const popup = useContext(PopupContext);

  return (
    <Formik
      initialValues={{
        field: defaultValue || '',
      }}
      validationSchema={yup.object({
        field: yupValidator || yup.string(),
      })}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={({ field }) => popup.pop(field)}
    >
      <Form>
        <PopupBody>
          <FormTextInput
            placeholder={label}
            name="field"
            maxLength={maxLength}
            autoFocus
          />
        </PopupBody>
        <PopupButtons
          actions={[
            {
              label: 'Cancel',
              theme: 'secondary',
              onClick: () => popup.pop(),
            },
            {
              label: submitLabel,
              theme: 'primary',
              type: 'submit',
            },
          ]}
        />
      </Form>
    </Formik>
  );
}

PopupPrompt.defaultValues = {
  defaultValue: '',
};
