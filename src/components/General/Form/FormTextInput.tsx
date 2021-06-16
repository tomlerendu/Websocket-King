import React from 'react';
import 'twin.macro';
import { ErrorMessage, Field } from 'formik';

export interface FormTextInputProps {
  name: string,
  placeholder?: string,
  maxLength?: number,
  autoFocus?: boolean
}

export default function FormTextInput({
  name,
  placeholder,
  maxLength,
  autoFocus,
}: FormTextInputProps) {
  return (
    <>
      <Field
        name={name}
        tw="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 leading-8 border-2 border-gray-200 dark:border-gray-700 focus:border-gray-400 focus:dark:border-gray-600 text-gray-800 dark:text-gray-200"
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
      <ErrorMessage
        name={name}
        component="div"
        tw="pt-2 text-red-800 text-sm font-semibold"
      />
    </>
  );
}
