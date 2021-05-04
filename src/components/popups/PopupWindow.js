import React, { useEffect, useRef, useState } from 'react';

function PopupWindow(props) {
  const [scLauncher, setScLauncher] = useState(null);
  const { isOpen, children } = props;
  const emojiPopup = useRef(null);

  useEffect(() => {
    setScLauncher(document.querySelector('#sc-launcher'));
    if (scLauncher === null) return;
    scLauncher.addEventListener('click', interceptLauncherClick);
    return () => {
      scLauncher.removeEventListener('click', interceptLauncherClick);
    };
  }, []);

  const interceptLauncherClick = (e) => {
    const clickedOutside = !emojiPopup.current.contains(e.target) && isOpen;
    clickedOutside && props.onClickedOutside(e);
  };

  return (
    <div className='sc-popup-window' ref={emojiPopup}>
      <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
        <input
          onChange={props.onInputChange}
          className='sc-popup-window--search'
          placeholder='Search emoji...'
        />
        {children}
      </div>
    </div>
  );
}

export default PopupWindow;
