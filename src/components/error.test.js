import * as React from 'react';
import { shallow } from 'enzyme';
import Error from "./error";

describe('<Error />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Error />);
    expect(wrapper.children.length).toBe(1);
  });
});
