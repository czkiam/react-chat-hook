import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';

function UserInput(props) {
  const [inputActive, setInputActive] = useState(false);
  const [inputHasText, setInputHasText] = useState(false);
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
  const [emojiFilter, setEmojiFilter] = useState('');
  const _fileUploadButton = useRef(null);
  const [emojiPickerButton, setEmojiPickerButton] = useState(null);
  const userInput = useRef(null);
  // constructor() {
  //   super();
  //   state = {
  //     inputActive: false,
  //     inputHasText: false,
  //     emojiPickerIsOpen: false,
  //     emojiFilter: '',
  //   };
  // }

  useEffect(() => {
    setEmojiPickerButton(document.querySelector('#sc-emoji-picker-button'));
  }, []);
  // componentDidMount() {
  //   emojiPickerButton = document.querySelector('#sc-emoji-picker-button');
  // }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return _submitText(event);
    }
  };

  const handleKeyUp = (event) => {
    const inputHasText =
      event.target.innerHTML.length !== 0 && event.target.innerText !== '\n';
    //setState({ inputHasText });
    setInputHasText(inputHasText);
  };

  const _showFilePicker = () => {
    _fileUploadButton.click();
  };

  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    if (!emojiPickerIsOpen) {
      setEmojiPickerIsOpen(true);
      //setState({ emojiPickerIsOpen: true });
    }
  };

  const closeEmojiPicker = (e) => {
    if (emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    // setState({ emojiPickerIsOpen: false });
    setEmojiPickerIsOpen(false);
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

  const _onFilesSelected = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      props.onFilesSelected(event.target.files);
    }
  };

  const _handleEmojiPicked = (emoji) => {
    setEmojiPickerIsOpen(false);
    if (inputHasText) {
      userInput.current.innerHTML += emoji;
    } else {
      props.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji },
      });
    }
  };

  const handleEmojiFilterChange = (event) => {
    const emojiFilter = event.target.value;
    setEmojiFilter(emojiFilter);
  };

  const _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={emojiPickerIsOpen}
      onClickedOutside={closeEmojiPicker}
      onInputChange={handleEmojiFilterChange}
    >
      <EmojiPicker onEmojiPicked={_handleEmojiPicked} filter={emojiFilter} />
    </PopupWindow>
  );

  const _renderSendOrFileIcon = () => {
    if (inputHasText) {
      return (
        <div className='sc-user-input--button'>
          <SendIcon onClick={_submitText.bind(this)} />
        </div>
      );
    }
    return (
      <div className='sc-user-input--button'>
        <FileIcon onClick={_showFilePicker.bind(this)} />
        <input
          type='file'
          name='files[]'
          multiple
          ref={_fileUploadButton}
          onChange={_onFilesSelected}
        />
      </div>
    );
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
        onKeyDown={handleKeyDown.bind(this)}
        onKeyUp={handleKeyUp.bind(this)}
        contentEditable='true'
        placeholder='Write a reply...'
        className='sc-user-input--text'
      ></div>
      <div className='sc-user-input--buttons'>
        <div className='sc-user-input--button'></div>
        <div className='sc-user-input--button'>
          {props.showEmoji && (
            <EmojiIcon
              onClick={toggleEmojiPicker}
              isActive={emojiPickerIsOpen}
              tooltip={_renderEmojiPopup()}
            />
          )}
        </div>
        {_renderSendOrFileIcon()}
      </div>
    </form>
  );
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default UserInput;
