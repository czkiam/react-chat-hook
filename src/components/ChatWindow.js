import PropTypes from 'prop-types';
import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

function ChatWindow(props) {
  let messageList = props.messageList || [];
  let classList = ['sc-chat-window', props.isOpen ? 'opened' : 'closed'];

  const onUserInputSubmit = (message) => {
    props.onUserInputSubmit(message);
  };

  const onFilesSelected = (filesList) => {
    props.onFilesSelected(filesList);
  };

  return (
    <div className={classList.join(' ')}>
      <Header
        teamName={props.agentProfile.teamName}
        imageUrl={props.agentProfile.imageUrl}
        onClose={props.onClose}
      />
      <MessageList
        messages={messageList}
        imageUrl={props.agentProfile.imageUrl}
      />
      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={props.showEmoji}
      />
    </div>
  );
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default ChatWindow;
