import React from 'react';
import { mount } from '../../../tests/enzyme';
import Spacer from './Spacer';

describe('Spacer', () => {
  it('can render without errors', () => {
    expect(mount(<Spacer />).first()).not.toBeNull();
    expect(mount(<Spacer size="half" />).first()).not.toBeNull();
    expect(mount(<Spacer size="default" />).first()).not.toBeNull();
  });
});
