import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

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
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
    test('renders giveUp button', () => {
      const giveUpbutton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpbutton.length).toBe(1);
    });
  });
});

describe('update state', () => {
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
    test('does not render giveUp button', () => {
      const giveUpbutton = findByTestAttr(wrapper, 'give-up-button');
      expect(giveUpbutton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has `gaveUp` piece of state as prop', () => {
    const gaveUp = true;
    const wrapper = setup({ gaveUp });
    const gaveUpProp = wrapper.instance().props.gaveUp;
    expect(gaveUpProp).toBe(gaveUp);
  });
  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
  test('`giveUp` action creator is a function prop', () => {
    const wrapper = setup();
    const giveUpProp = wrapper.instance().props.giveUp;
    expect(giveUpProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    // set up mock for `guessWord`
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock
    };
    // set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    // add value to input box

    wrapper.setState({ currentGuess: guessedWord });
    // simulate click
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('calls `guessWord` when button is clicked', () => {
    const guessWordMockCallCount = guessWordMock.mock.calls.length;
    expect(guessWordMockCallCount).toBe(1);
  });

  test('calls `guessWord` with input value as argument', () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  test('clear input box on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('');
  });
});

describe('`giveUp` action creator call', () => {
  let giveUpMock;
  let wrapper;
  beforeEach(() => {
    giveUpMock = jest.fn();
    const props = {
      giveUp: giveUpMock
    };
    wrapper = shallow(<UnconnectedInput {...props} />);
    const giveUpbutton = findByTestAttr(wrapper, 'give-up-button');
    giveUpbutton.simulate('click', { preventDefault() {} });
  });
  test('call `giveUp` when button is clicked', () => {
    const giveUpMockCallCount = giveUpMock.mock.calls.length;
    expect(giveUpMockCallCount).toBe(1);
  });
});
