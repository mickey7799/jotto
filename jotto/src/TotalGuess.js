import React from 'react';
import PropTypes from 'prop-types';

function TotalGuess(props) {
  return (
    <h5 data-test='Component-total-guesses'>
      Total Guesses: {props.totalGuess}
    </h5>
  );
}

TotalGuess.propTypes = {
  totalGuess: PropTypes.number.isRequired
};

export default TotalGuess;
