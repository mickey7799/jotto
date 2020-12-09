import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input from './Input';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const inputBox = findByTestAttr(wrapper, 'component-input');
      expect(inputBox.length).toBe(1);
    });
    test('renders input box', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
    test('renders submit button', () => {});
  });
});

describe('update state', () => {
  describe('word has been guessed', () => {
    test('renders component without error', () => {});
    test('does not render input box', () => {});
    test('does not render submit button', () => {});
  });
});
