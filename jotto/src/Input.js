import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord, giveUp } from './actions';

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    // initialize state
    this.state = { currentGuess: null };
    // bind this for submitGuessedWord
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
    this.giveUpOnClick = this.giveUpOnClick.bind(this);
  }

  submitGuessedWord(e) {
    e.preventDefault();
    const gussedWord = this.state.currentGuess;
    if (gussedWord && gussedWord.length > 0) {
      this.props.guessWord(gussedWord);
    }

    this.setState({ currentGuess: '' });
  }

  giveUpOnClick(e) {
    e.preventDefault();
    this.props.giveUp();
  }
  render() {
    const contents =
      this.props.success || this.props.gaveUp ? null : (
        <form className='form-inline'>
          <input
            data-test='input-box'
            className='mb-2 mx-sm-3'
            type='text'
            placeholder='enter guess'
            value={this.state.currentGuess}
            onChange={e => this.setState({ currentGuess: e.target.value })}
          />
          <button
            data-test='submit-button'
            type='submit'
            className='btn btn-primary mb-2'
            onClick={this.submitGuessedWord}
          >
            Submit
          </button>
          <button
            data-test='give-up-button'
            className='btn btn-danger mb-2'
            onClick={this.giveUpOnClick}
          >
            Give up
          </button>
        </form>
      );
    return <div data-test='component-input'>{contents}</div>;
  }
}

const mapStateToProps = ({ success, gaveUp }) => {
  return { success, gaveUp };
};

export default connect(
  mapStateToProps,
  { guessWord, giveUp }
)(UnconnectedInput);
