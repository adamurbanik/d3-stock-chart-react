import * as React from 'react';
import { shallow } from 'enzyme';
import Loader from "./loader";

describe('<Loader />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.children.length).toBe(1);
  });
});
