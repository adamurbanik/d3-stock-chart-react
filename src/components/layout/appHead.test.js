import * as React from 'react';
import { shallow } from 'enzyme';
import AppHead from './appHead';

describe('<AppHead />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<AppHead />);
    expect(wrapper.children.length).toBe(1);
  });
});
