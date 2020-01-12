import * as React from 'react';
import { shallow } from 'enzyme';
import Header from "./header";

describe('<Header />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.children.length).toBe(1);
  });
});
