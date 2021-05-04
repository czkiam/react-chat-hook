import PropTypes from 'prop-types';
import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';

function ChatWindow(props) {
  let messageList = props.messageList || [];
  let classList = ['sc-chat-window', props.isOpen ? 'opened' : 'closed'];

  const onUserInputSubmit = (message) => {
    props.onUserInputSubmit(message);
  };

  return (
    <div className={classList.join(' ')}>
      <MessageList
        messages={messageList}
        imageUrl={props.agentProfile.imageUrl}
      />
      <UserInput
        onSubmit={onUserInputSubmit}
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
};

export default ChatWindow;
