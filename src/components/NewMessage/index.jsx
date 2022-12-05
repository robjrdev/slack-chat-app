import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { sendDirectMessage } from '../../api/api';
import InputPlacholder from '../input/inputPlacholder';
import useReceiverStore from '../../store/receiverProfile';
import userProfileStore from '../../store/userProfile';
import { _ } from 'lodash'
import Conversation from '../Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Picker from 'emoji-picker-react';
import { MdInsertEmoticon } from 'react-icons/md';

export const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
  })) 

  const onEmojiClick = (e) =>{
    setMessage(prevInput => prevInput + e.emoji);
  }

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
    sendDirectMessage({receiver_id: receiver.receiver_id, receiver_class: 'User', body: message, header: profile}).then((credentials) => {
      (!_.isEmpty(credentials)) &&  overwriteReceiver({ ...credentials });     
    })   
    setMessage('');
  };


  const toggleEmoji = () => {
    showPicker(false);
  }

  const queryConversation = new QueryClient();
  return (
    <div className="new-message flex-column">
    <div className="recipient flex-row">
      <h3>Recipient :</h3>
     <p className='recipient-name flex-row'style={{marginLeft:'.5rem'}}>{!receiver ? '' : receiver.receiver_uid} </p>
    </div>
      <div className="conversation flex-column" style={{width:'100%'}}>
        {/* <Conversation receiver_id={!receiver ? '' : receiver.receiver_id}/> */}
        <QueryClientProvider client={queryConversation}>
          <Conversation receiver_id={receiver && receiver.receiver_id}/>
        </QueryClientProvider>
      </div>
      
      {showPicker && 
      <div style={{position:'absolute', right:'0', top:'30%'}}> 
         <Picker pickerStyle={{ width: '100%', position:'absolute' }} onEmojiClick={onEmojiClick} /> </div>
        }
      <form className="message-form flex-row" onSubmit={sendMessage}>
        <div className="message-field input-container" style={{position:'relative'}}>
          <input
            className="input-container__textbox"
            value={message}
            onChange={newMessage}
            placeholder=" "
            autoComplete="off"
            autoCorrect="off"
          >
          </input>
          
          <div style={{postion: 'absolute', right: '-10'}}>
            <MdInsertEmoticon onClick={() => setShowPicker(val => !val)} />
          </div>
          
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
