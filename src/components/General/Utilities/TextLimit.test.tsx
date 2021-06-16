import React from 'react';
import { mount } from '../../../tests/enzyme';
import TextLimit from './TextLimit';

describe('Text Limit', () => {
  it('doesnt cut text until it exceeds the character limit', () => {
    const wrapper = mount(<TextLimit characters={4}>Text</TextLimit>);
    expect(wrapper.text()).toEqual('Text');
  });

  it('cuts off text that exceeds the character limit', () => {
    const wrapper = mount(<TextLimit characters={6}>Longer text</TextLimit>);
    expect(wrapper.text()).toEqual('Longer…');
  });
});
