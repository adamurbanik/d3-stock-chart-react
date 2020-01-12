import * as React from 'react';
import { shallow } from 'enzyme';
import Layout from "./layout";

describe('<Layout />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.children.length).toBe(1);
  });
});
