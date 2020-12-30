import React from 'react';
import { shallow } from 'enzyme';

import App, { UnconnectedApp } from './App';
import { storeFactory } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('redux props', () => {
  let wrapper;
  const success = false;
  const gaveUp = false;
  const secretWord = 'party';
  const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];

  BeforeEach(() => {
    wrapper = setup({
      success,
      gaveUp,
      secretWord,
      guessedWords
    });
  });
  test('has access to `success` state', () => {
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has access to `secretWord` state', () => {
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has access to `gaveUp` state', () => {
    const gaveUpProp = wrapper.instance().props.gaveUp;
    expect(gaveUpProp).toBe(gaveUp);
  });
  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const gussedWordsProp = wrapper.instance().props.guessedWords;
    expect(gussedWordsProp).toEqual(guessedWords);
  });
  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test('`getSecretWord` runs on App mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  };

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
