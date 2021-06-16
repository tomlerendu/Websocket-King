import React, { ReactEventHandler } from 'react';
import { theme } from 'twin.macro';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';

export interface EditorProps {
  name?: string,
  value: string,
  onChange: (value: string) => void,
  onBlur?: (event: ReactEventHandler) => void,
  onFocus?: (event: ReactEventHandler) => void,
  minLines: number,
  maxLines: number,
  placeholder?: string,
}

export default function Editor({
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  minLines,
  maxLines,
}: EditorProps) {
  return (
    <div
      className="editor"
      tw="overflow-y-auto"
      style={{
        minHeight: `${Number(theme`lineHeight.snug`) * minLines}rem`,
        maxHeight: `${Number(theme`lineHeight.snug`) * maxLines}rem`,
      }}
    >
      <SimpleCodeEditor
        name={name}
        onValueChange={onChange}
        value={value}
        onFocus={(event: any) => onFocus?.(event)}
        onBlur={(event: any) => onBlur?.(event)}
        placeholder={placeholder}
        highlight={(code) => highlight(code, languages.json, 'json')}
        tw="text-gray-800 dark:text-gray-200 font-mono text-sm leading-snug"
        style={{
          scrollBehavior: 'auto',
          minHeight: `${Number(theme`lineHeight.snug`) * minLines}rem`,
        }}
      />
    </div>
  );
}
