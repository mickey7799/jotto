import React from 'react';
import { connect } from 'react-redux';

function TotalGuess(props) {
  return <h5>Total Guesses: {props.totalGuess}</h5>;
}

const mapStateToProps = state => {
  return {
    totalGuess: state.guessedWords.length
  };
};

export default connect(mapStateToProps)(TotalGuess);
