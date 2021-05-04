import React, { useEffect, useRef } from 'react';
import Message from './Messages';

function MessageList(props) {
  const scrollList = useRef(null);

  useEffect(() => (scrollList.current.scrollTop = scrollList.current.scrollHeight));

  return (
    <div className='sc-message-list' ref={scrollList}>
      {props.messages.map((message, i) => {
        return <Message message={message} key={i} />;
      })}
    </div>
  );
}

export default MessageList;
