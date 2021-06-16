import React from 'react';
import { render, testId } from '../../../tests/enzyme';
import EmptyMessage from './EmptyMessage';

describe('Text Limit', () => {
  const wrapper = render(<EmptyMessage heading="Heading">Description</EmptyMessage>);

  it('can display a heading', () => {
    expect(wrapper.find(testId('heading')).text())
      .toEqual('Heading');
  });

  it('can display a child description', () => {
    expect(wrapper.find(testId('description')).text())
      .toEqual('Description');
  });
});
