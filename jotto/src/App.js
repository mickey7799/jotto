import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import {
  getSecretWord,
  resetGame,
  setUserEntering,
  setUserSecretWord
} from './actions';
import Input from './Input';
import TotalGuess from './TotalGuess';
import NewWord from './NewWord';
import SecretWordReveal from './SecretWordReveal';
import EnterButton from './EnterButton';
import EnterWordForm from './EnterWordForm';

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
    let contents;
    if (this.props.userEnter === 'inProgress') {
      contents = <EnterWordForm formAction={this.props.setUserSecretWord} />;
    } else {
      contents = (
        <div>
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
          <EnterButton
            display={this.props.guessedWords.length === 0}
            buttonAction={this.props.setUserEntering}
          />
        </div>
      );
    }
    return (
      <div className='container'>
        <h1>Jotto</h1>
        {contents}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { success, guessedWords, userEnter, secretWord, gaveUp } = state;
  return { success, guessedWords, userEnter, secretWord, gaveUp };
};

export default connect(
  mapStateToProps,
  { getSecretWord, resetGame, setUserEntering, setUserSecretWord }
)(UnconnectedApp);
