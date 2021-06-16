import React, { Component } from 'react';
import { Formik } from 'formik';

export interface FormikDecoratorProps {
  initialValues: { [key: string]: any },
};

export default function FormikDecorator(
  component: any,
  { args }: any,
) {
  return (
    <Formik
      initialValues={args.initialValues}
      onSubmit={() => { }}
    >
      {component()}
    </Formik>
  )
}
