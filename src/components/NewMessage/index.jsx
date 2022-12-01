import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { sendDirectMessage } from '../../api/api';
import InputPlacholder from '../input/inputPlacholder';
import TextInput from '../input/textBox';
import { Modal } from '../Modal';
import Search from '../Search';
import useReceiverStore from '../../store/receiverProfile';
import userProfileStore from '../../store/userProfile';
import { _ } from 'lodash'
import Conversation from '../Conversation';

export const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);
  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
  })) 
  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    (state) => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  const newMessage = e => {
    e.preventDefault();

    setMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    // setDisplayMessage([...displayMessage, message]);
    sendDirectMessage({receiver_id: receiver.receiver_id, receiver_class: 'User', body: message, header: profile}).then((credentials) => {
      (!_.isEmpty(credentials)) &&  overwriteReceiver({ ...credentials });     
    })   
    setMessage('');
  };
  return (
    <div className="new-message flex-column">
    <div className="recipient flex-row">
      <h3>Recipient :</h3>
     <p style={{marginLeft:'.5rem'}}>{!receiver ? '' : receiver.receiver_uid} </p>
    </div>
      <div className="conversation flex-row">
        {/* <Conversation receiver_id={!receiver ? '' : receiver.receiver_id}/> */}
        <Conversation receiver_id={receiver && receiver.receiver_id}/>

      </div>
      <form className="message-form flex-row" onSubmit={sendMessage}>
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
