import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import TotalGuess from './TotalGuess';

const defaultProps = { totalGuess: 0 };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuess {...setupProps} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'Component-total-guesses');
  expect(component.length).toBe(1);
});

test('renders the number of guesses', () => {
  const totalGuess = 8;
  const wrapper = setup({ totalGuess });
  const component = findByTestAttr(wrapper, 'Component-total-guesses');
  expect(component.text()).toContain(totalGuess.toString());
});
