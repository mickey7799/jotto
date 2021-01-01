import React from 'react';

const EnterButton = props => {
  if (props.display) {
    return (
      <button
        data-test='component-enter-word-button'
        className='btn btn-primary mb-2'
        onClick={props.buttonAction}
      >
        Enter your own secret word
      </button>
    );
  } else {
    return <div data-test='component-enter-word-button'></div>;
  }
};

export default EnterButton;
