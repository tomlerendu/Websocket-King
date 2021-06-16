import React from 'react';
import { shallow, mount, testId } from '../../../tests/enzyme';
import Heading from './Heading';

describe('Heading', () => {
  it('displays the title', () => {
    const wrapper = shallow(<Heading>Title</Heading>);
    expect(wrapper.find(testId('title')).text())
      .toEqual('Title');
  });

  it('displays the buttons', () => {
    const icon1 = <div>Icon 1</div>;
    const icon2 = <div>Icon 2</div>;

    const wrapper = mount(
      <Heading
        buttons={[
          {
            icon: icon1,
            alt: 'Close',
            onClick: () => true,
          },
          {
            icon: icon2,
            alt: 'Open',
            onClick: () => true,
          },
        ]}
      >
        Title
      </Heading>,
    );
    expect(wrapper.find('ButtonSecondary').length)
      .toEqual(2);
    expect(wrapper.find('ButtonSecondary').first().text())
      .toContain('Icon 1');
    expect(wrapper.find('ButtonSecondary').last().text())
      .toContain('Icon 2');
  });

  it('has clickable buttons', () => {
    const fn = jest.fn();

    const wrapper = mount(
      <Heading
        buttons={[
          {
            icon: <div />,
            alt: 'Action',
            onClick: fn,
          },
        ]}
      >
        Title
      </Heading>,
    );

    wrapper.find('button').simulate('click');
    expect(fn.mock.calls.length).toBe(1);
  });
});
