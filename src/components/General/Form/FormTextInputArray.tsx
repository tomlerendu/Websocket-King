import React, { Fragment, useState } from 'react';
import { MdClose } from 'react-icons/md';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';
import { useField } from 'formik';
import ButtonSecondary from '../Styled/ButtonSecondary';

export interface FormTextInputArrayProps {
  name: string,
  maxLength?: number,
  addItemCta: string,
}

export default function FormTextInputArray({
  name,
  maxLength,
  addItemCta,
}: FormTextInputArrayProps) {
  const [field, meta, helpers] = useField<{ id: string, value: string}[]>({ name });
  const [focusedItem, setFocusedItem] = (
    useState<{ id: string, value: string} | undefined>(undefined)
  );

  return (
    <>
      <div
        css={[
          tw`w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg border-2 text-gray-800 dark:text-gray-300`,
          focusedItem !== undefined && tw`border-gray-400 dark:border-gray-600`,
          focusedItem === undefined && tw`border-gray-200 dark:border-gray-700`,
        ]}
      >
        {field.value.map((item) => (
          <Fragment key={item.id}>
            <div
              className="group"
              tw="flex"
            >
              <input
                type="text"
                tw="w-full py-1 px-4 bg-transparent"
                maxLength={maxLength}
                value={item.value}
                onFocus={() => setFocusedItem(item)}
                onBlur={() => setFocusedItem(undefined)}
                onChange={(event) => {
                  helpers.setValue(
                    field.value.map((existingItem) => (
                      item === existingItem
                        ? {
                          id: existingItem.id,
                          value: event.target.value,
                        }
                        : existingItem
                    )),
                  );
                  helpers.setTouched(true);
                }}
              />
              <ButtonSecondary
                type="button"
                tw="mr-3 p-1 invisible group-hover:visible"
                onClick={() => helpers.setValue(
                  field.value.filter((existingItem) => existingItem.id !== item.id),
                )}
              >
                <MdClose />
              </ButtonSecondary>
            </div>
            <div
              css={[
                tw`border-b border-gray-200 dark:border-gray-700 mx-4`,
                focusedItem?.id === item.id && tw`border-gray-400 dark:border-gray-600`,
              ]}
            />
          </Fragment>
        ))}
        <ButtonSecondary
          type="button"
          css={[
            tw`w-full text-xs h-8 text-center`,
            !!field.value.length && 'mt-2',
          ]}
          onClick={() => (
            helpers.setValue([
              ...field.value,
              { id: uuid(), value: '' },
            ])
          )}
        >
          {addItemCta}
        </ButtonSecondary>
      </div>
      {meta.error && (
        <div
          tw="pt-2 text-red-800 text-sm font-semibold"
        >
          {
            typeof meta.error === 'string'
              ? meta.error
              : (meta.error as any)?.find((error: any) => !!error).value
          }
        </div>
      )}
    </>
  );
}
