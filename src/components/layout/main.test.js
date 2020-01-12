import * as React from 'react';
import { shallow } from 'enzyme';
import Main from "./main";

describe('<Main />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.children.length).toBe(1);
  });
});
