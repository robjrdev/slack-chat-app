import React, { useState } from 'react';
import { Modal } from '../Modal';

export const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);

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
    <div className="new-message flex-column " onSubmit={sendMessage}>
      <div className="recipient">
        <input type="text" placeholder="Recipient" />
      </div>
      <div className="conversation">{displayMessage}</div>
      <form className="message-form flex-row">
        <input
          type="text-area"
          placeholder="New Message"
          value={message}
          onChange={newMessage}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
