import React from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import chatIconUrl from './../../assets/chat-icon.svg';

function Message(props) {

  let contentClassList = [
    'sc-message--content',
    props.message.author === 'me' ? 'sent' : 'received',
  ];

  const _renderMessageOfType = (type) => {
    switch (type) {
      case 'text':
        return <TextMessage {...props.message} />;
      case 'emoji':
        return <EmojiMessage {...props.message} />;
      case 'file':
        return <FileMessage {...props.message} />;
      default:
        console.error(
          `Attempting to load message with unsupported file type '${type}'`,
        );
    }
  };

  return (
    <div className='sc-message'>
      <div className={contentClassList.join(' ')}>
        <div
          className='sc-message--avatar'
          style={{
            backgroundImage: `url(${chatIconUrl})`,
          }}
        ></div>
        {_renderMessageOfType(props.message.type)}
      </div>
    </div>
  );
}

export default Message;
