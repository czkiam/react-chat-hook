import React, { useState, useRef } from 'react';
import SendIconButton from './icons/SendIconButton';

function UserInput(props) {
  const [inputActive, setInputActive] = useState(false);
  const userInput = useRef(null);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event);
    }
  };
  const _submitText = (event) => {
    event.preventDefault();
    const text = userInput.current.textContent;
    if (text && text.length > 0) {
      props.onSubmit({
        author: 'me',
        type: 'text',
        data: { text },
      });
      userInput.current.innerHTML = '';
    }
  };

  return (
    <form className={`sc-user-input ${inputActive ? 'active' : ''}`}>
      <div
        role='button'
        tabIndex='0'
        onFocus={() => {
          setInputActive(true);
        }}
        onBlur={() => {
          setInputActive(false);
        }}
        ref={userInput}
        onKeyDown={handleKeyDown}
        contentEditable='true'
        placeholder='Write a reply...'
        className='sc-user-input--text'
      ></div>
      <div className='sc-user-input--buttons'>
        <div className='sc-user-input--button'>
          <SendIconButton onClick={_submitText} />
        </div>
      </div>
    </form>
  );
}

export default UserInput;
