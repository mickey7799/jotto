import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function NewWord(props) {
  return (
    <Fragment>
      {props.success ? (
        <button
          data-test='component-new-word-button'
          className='btn btn-primary mb-2'
          onClick={props.resetAction}
        >
          New Game
        </button>
      ) : (
        <div data-test='component-new-word-button' />
      )}
    </Fragment>
  );
}

NewWord.propTypes = {
  success: PropTypes.bool.isRequired,
  resetAction: PropTypes.func
};

export default NewWord;
