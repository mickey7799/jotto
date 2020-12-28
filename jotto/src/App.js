import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getSecretWord, resetGame } from './actions';
import Input from './Input';
import TotalGuess from './TotalGuess';
import NewWord from './NewWord';
import SecretWordReveal from './SecretWordReveal';

export class UnconnectedApp extends Component {
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  resetAction = () => {
    this.props.getSecretWord();
    this.props.resetGame();
  };
  render() {
    return (
      <div className='container'>
        <h1>Jotto</h1>
        <h3>{this.props.secretWord}</h3>
        <Congrats success={this.props.success} />
        <SecretWordReveal
          display={this.props.gaveUp}
          secretWord={this.props.secretWord}
        />
        <NewWord
          success={this.props.success || this.props.gaveUp}
          resetAction={this.resetAction}
        />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuess totalGuess={this.props.guessedWords.length} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, secretWord, gaveUp } = state;
  return { success, guessedWords, secretWord, gaveUp };
};

export default connect(
  mapStateToProps,
  { getSecretWord, resetGame }
)(UnconnectedApp);
