import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import InputPlacholder from '../input/inputPlacholder';
import TextInput from '../input/textBox';
import { Modal } from '../Modal';

export const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);
  console.log(displayMessage);

  const newMessage = e => {
    e.preventDefault();

    setMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    setDisplayMessage([...displayMessage, message]);
    setMessage('');
  };
  return (
    <div className="new-message flex-column">
      <div className="recipient input-container">
        <input
          className="input-container__textbox"
          placeholder=" "
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <InputPlacholder display="Recipient" />
      </div>
      <div className="conversation flex-row">{displayMessage}</div>
      <form className="message-form flex-row" onSubmit={sendMessage}>
        {/* <input
          type="text-area"
          placeholder="New Message"
          value={message}
          onChange={newMessage}
        /> */}
        <div className="message-field input-container">
          <input
            className="input-container__textbox"
            value={message}
            onChange={newMessage}
            placeholder=" "
            autoComplete="off"
            autoCorrect="off"
          ></input>
          <InputPlacholder display="New Message" />
        </div>
        <div className="send-message-btn">
          <button type="submit">
            <BiSend size='2rem'/>
          </button>
        </div>

      </form>
    </div>
  );
};
