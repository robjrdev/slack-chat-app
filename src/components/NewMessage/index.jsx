import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { sendDirectMessage, getChannelMembers } from '../../api/api';
import InputPlacholder from '../input/inputPlacholder';
import useReceiverStore from '../../store/receiverProfile';
import userProfileStore from '../../store/userProfile';
import { _ } from 'lodash'
import Conversation from '../Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Picker from 'emoji-picker-react';
import { MdInsertEmoticon } from 'react-icons/md';
import { RoundedButton } from '../Button';
import { PopUpModal } from '../Modal';
import AddMember from '../AddMember';
import useAllUsersStore from '../../store/allUsers';



export const NewMessage = () => {
  const allAvailableUsers = useAllUsersStore(state => state.allAvailableUser)
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [memberList, setMemberList] = useState([])
  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
    }))

  const onEmojiClick = (e) => {
    setMessage(prevInput => prevInput + e.emoji);
  }
  //  }))

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
    sendDirectMessage({ receiver_id: receiver.receiver_id, receiver_class: receiver.class, body: message, header: profile }).then((credentials) => {
      (!_.isEmpty(credentials)) && overwriteReceiver({ ...credentials });
    })
    setMessage('');
  };
  const loadMemberList = async () => {
    await setMemberList([]);
    const arrVal = await getChannelMembers({ header: profile, id: receiver.receiver_id });
    await setMemberList(arrVal);
  }



  const toggleEmoji = () => {
    showPicker(false);
  }

  const queryConversation = new QueryClient();

  const filteredMembers = allAvailableUsers[0].filter((user) => memberList.some(item => item.user_id === user.id));
  const toggleModal = () => {
    loadMemberList()
    setIsShown(!isShown);
  };
  const closeModal = () => {
    setIsShown(false);
  };
  const clickBlur = () => {
    setIsShown(false);
  };
  return (
    <div className="new-message flex-column">
      <div className="header flex-row">
        <div className="recipient flex-row">
          <h3>{receiver === null ? '' : receiver.class === 'Channel' ? 'Channel Name :' : 'Recipient :'}</h3>
          <p className='recipient-name flex-row' style={{ marginLeft: '.5rem' }}>{!receiver ? '' : receiver.name} </p>
        </div>
        {isShown && <PopUpModal clickBlur={clickBlur}><AddMember memberList={filteredMembers} closeBtn={closeModal} /></PopUpModal>}
      
        
        { (!_.isEmpty(receiver)) && receiver.class === 'Channel' && <RoundedButton displayText='+' buttonClick={toggleModal} />}
      </div>
      <div className="conversation flex-column">
        <Conversation receiver_id={receiver && receiver.receiver_id} />
      </div>

      {showPicker &&
        <div className='emoji-container' style={{ position: 'absolute', right: '5%', top: '51%', overflowY: 'scroll', maxHeight: '20rem', fontSize: '2rem', borderRadius: '2rem' }}>
          <Picker pickerStyle={{ fontSize: '0.4rem' }} onEmojiClick={onEmojiClick} /> </div>
      }
      <form className="message-form flex-row" onSubmit={sendMessage}>
        <div className="message-field input-container" style={{ position: 'relative' }}>
          <input
            className="input-container__textbox"
            value={message}
            onChange={newMessage}
            placeholder="Write Message"
            autoComplete="off"
            autoCorrect="off"
          >
          </input>

          <div style={{ position: 'absolute', right: '0', display: 'flex', height: '100%', alignItems: 'center' }}>
            <MdInsertEmoticon onClick={() => setShowPicker(val => !val)} />
          </div>
        </div>
        <div className="send-message-btn">
          <button type="submit">
            <BiSend size='2rem' />
          </button>
        </div>

      </form>

    </div>

    // </div >

  );
};
