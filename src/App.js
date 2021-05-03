import React, { useState } from 'react';
import { Launcher } from './components';
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import Footer from './Footer';
import monsterImgUrl from './assets/monster.png';
import './assets/styles';

function App() {
  const [messageList, setMessageList] = useState(messageHistory);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // constructor() {
  //   super();
  //   this.state = {
  //     messageList: messageHistory,
  //     newMessagesCount: 0,
  //     isOpen: false
  //   };
  // }

  const _onMessageWasSent = (message) => {
    setMessageList([...messageList, message]);
    // this.setState({
    //   messageList: [...this.state.messageList, message],
    // });
  };

  const _onFilesSelected = (fileList) => {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setMessageList([
      ...messageList,
      {
        type: 'file',
        author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name,
        },
      },
    ]);

    // this.setState({
    //   messageList: [
    //     ...this.state.messageList,
    //     {
    //       type: 'file',
    //       author: 'me',
    //       data: {
    //         url: objectURL,
    //         fileName: fileList[0].name,
    //       },
    //     },
    //   ],
    // });
  };

  const _sendMessage = (text) => {
    if (text.length > 0) {
      const count = isOpen
        ? newMessagesCount
        : newMessagesCount + 1;

      setNewMessagesCount(count);
      setMessageList([
        ...messageList,
        {
          author: 'them',
          type: 'text',
          data: { text },
        },
      ]);
      // this.setState({
      //   newMessagesCount: newMessagesCount,
      //   messageList: [
      //     ...this.state.messageList,
      //     {
      //       author: 'them',
      //       type: 'text',
      //       data: { text },
      //     },
      //   ],
      // });
    }
  };

  const _handleClick = () => {
    setIsOpen(!isOpen);
    setNewMessagesCount(0);
    // this.setState({
    //   isOpen: !this.state.isOpen,
    //   newMessagesCount: 0,
    // });
  };

  return (
    <div>
      <Header />
      <TestArea onMessage={_sendMessage} />
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl:
            'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        }}
        onMessageWasSent={_onMessageWasSent}
        onFilesSelected={_onFilesSelected}
        messageList={messageList}
        newMessagesCount={newMessagesCount}
        handleClick={_handleClick}
        isOpen={isOpen}
        showEmoji={false}
      />
      <img className='demo-monster-img' src={monsterImgUrl} alt={''} />
      <Footer />
    </div>
  );
}

export default App;
