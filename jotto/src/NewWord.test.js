import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import NewWord from './NewWord';

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<NewWord {...setupProps} />);
};

describe('render', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const compoent = findByTestAttr(wrapper, 'component-new-word-button');
    expect(compoent.length).toBe(1);
  });
  test('renders no text when `success` prop is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text()).toBe('');
  });
  test('renders non-empty text when `success` prop is true', () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, 'component-new-word-button');
    expect(component.text().length).not.toBe(0);
  });
});
test('does not throw warning with expected props', () => {
  const expectedProps = { success: false, resetAction: () => {} };
  checkProps(NewWord, expectedProps);
});
test('calls `resetAction` prop upon button click', () => {
  const resetActionMock = jest.fn();
  const wrapper = setup({ success: true, resetAction: resetActionMock });

  const resetButton = findByTestAttr(wrapper, 'component-new-word-button');
  resetButton.simulate('click');
  expect(resetActionMock.mock.calls.length).toBe(1);
});
