import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { sendDirectMessage, getChannelMembers } from '../../api/api';
import InputPlacholder from '../input/inputPlacholder';
import useReceiverStore from '../../store/receiverProfile';
import userProfileStore from '../../store/userProfile';
import { _ } from 'lodash'
import Conversation from '../Conversation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RoundedButton } from '../Button';
import { PopUpModal } from '../Modal';
import AddMember from '../AddMember';
import useAllUsersStore from '../../store/allUsers';


export const NewMessage = () => {
  const allAvailableUsers = useAllUsersStore(state => state.allAvailableUser)
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');
  const [memberList, setMemberList] = useState([])
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

        <RoundedButton displayText='+' buttonClick={toggleModal} />
      </div>
      <div className="conversation flex-column">
        <Conversation receiver_id={receiver && receiver.receiver_id} />
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
            <BiSend size='2rem' />
          </button>
        </div>

      </form>
    </div >
  );
};
