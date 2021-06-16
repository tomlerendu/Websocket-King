import React from 'react';
import { render, testId } from '../../../tests/enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
  it('displays the title', () => {
    const wrapper = render(<ListItem title="Test Title" />);
    expect(wrapper.find(testId('title')).text()).toEqual('Test Title');
  });

  it('displays the subtitle', () => {
    const wrapper = render(<ListItem title="Test Title" subtitle="Subtitle" />);
    expect(wrapper.find(testId('subtitle')).text()).toEqual('Subtitle');
  });
});
