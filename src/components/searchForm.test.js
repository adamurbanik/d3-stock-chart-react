import * as React from 'react';
import { shallow } from 'enzyme';
import SearchForm from './searchForm';

describe('<SearchForm />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children.length).toBe(1);
  });
});
