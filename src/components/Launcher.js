import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import incomingMessageSound from './../assets/sounds/notification.mp3';
import launcherIconActive from './../assets/close-icon.png';

function Launcher(props) {
  useEffect(() => {
    if (props.mute) {
      return;
    }
    const nextMessage = props.messageList[props.messageList?.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = true; //TODO: check Message length (compare last and current), useref
    if (isIncoming && isNew) {
      playIncomingMessageSound();
    }
  }, [props.messageList, props.mute]);

  const playIncomingMessageSound = () => {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  };

  const handleClick = () => {
    if (props.handleClick !== undefined) {
      props.handleClick();
    }
  };
  const classList = ['sc-launcher', props.isOpen ? 'opened' : ''];

  return (
    <div id='sc-launcher'>
      <div className={classList.join(' ')} onClick={handleClick}>
        <MessageCount count={props.newMessagesCount} isOpen={props.isOpen} />
        <img className={'sc-open-icon'} src={launcherIconActive} alt={''} />
        <img className={'sc-closed-icon'} src={launcherIcon} alt={''} />
      </div>
      <ChatWindow
        messageList={props.messageList}
        onUserInputSubmit={props.onMessageWasSent}
        onFilesSelected={props.onFilesSelected}
        agentProfile={props.agentProfile}
        isOpen={props.isOpen}
        onClose={handleClick}
        showEmoji={props.showEmoji}
      />
    </div>
  );
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className={'sc-new-messages-count'}>{props.count}</div>;
};

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
};

export default Launcher;
