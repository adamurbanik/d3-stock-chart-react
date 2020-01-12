import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Stock from './index';
import d3Service from '../services/d3Service';

jest.mock('../services/d3Service');

describe('<Stock />', () => {
  let dataset;
  beforeAll(() => {
    d3Service.applyStockData = jest.fn();
    d3Service.applyChartData = jest.fn();
    dataset = 'AAPL';
  });

  test('renders correctly', () => {
    const wrapper = shallow(<Stock />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children.length).toBe(1);
  });

  test('renders in successfully submitted state', async () => {
    const tree = renderer.create(<Stock />);

    await renderer.act(async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

      const input = tree.root.find(el => el.type === 'input');
      input.props.onChange({
        currentTarget: { value: dataset }
      });
      const button = tree.root.find(el => el.type === 'button');
      await button.props.onClick();

      const chartWrapper = tree.root.findAllByType('div')[1]

      expect(tree.toJSON()).toMatchSnapshot();
      expect(chartWrapper.props.className.includes('show')).toBe(true);
    });
  });

  test('renders in error state', async () => {
    const tree = renderer.create(<Stock />);

    await renderer.act(async () => {
      fetch.mockRejectOnce();

      const input = tree.root.find(el => el.type === 'input');
      input.props.onChange({
        currentTarget: { value: dataset }
      });
      const button = tree.root.find(el => el.type === 'button');
      await button.props.onClick();

      const chartWrapper = tree.root.findAllByType('div')[1]

      const error = tree.root.findAllByType('h1')[1];

      expect(tree.toJSON()).toMatchSnapshot();
      expect(chartWrapper.props.className.includes('show')).toBe(false);
      expect(error.props.className.includes('error-header')).toBe(true)
    });
  })
});
