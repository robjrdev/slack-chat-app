import React, { useState } from 'react'
import { PopUpModal } from '../../../components/Modal'
import { BiSend } from 'react-icons/bi';
import InputPlacholder from '../../../components/input/inputPlacholder';
import { createChannel } from '../../../api/api';
import userProfileStore from '../../../store/userProfile';
import { _ } from 'lodash';
import { TransparentButton } from '../../../components/Button';

const ChannelForm = ({ closeBtn, reloadChannel }) => {
  const [channelName, setChannelName] = useState('');
  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    (state) => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );


  const newChannel = e => {
    e.preventDefault();

    setChannelName(e.target.value)
  };

  const handleSubmitChannel = (e) => {

    e.preventDefault();
    if (!channelName) {
      alert('Please Fill The Required Fields')
    } else {
      createChannel({ name: channelName, member: [profile.uid], header: profile }).then((credentials) => {
        (!_.isEmpty(credentials)) && overwriteProfile({ ...credentials });
      })
      setChannelName('')
      closeBtn()
      reloadChannel();
    }

  }

  const handleCloseModal = (e) => {
    //e.preventDefault()
    closeBtn();
  }

  return (
    // <PopUpModal>
    <form action="#" className="channel-form flex-column" onSubmit={handleSubmitChannel}>
      <TransparentButton buttonClick={handleCloseModal} />
      <div className="channel-field input-container">
        <input
          className="input-container__textbox"
          value={channelName}
          onChange={newChannel}
          placeholder=" "
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <InputPlacholder display="Channel Name" />
      </div>
      <div className="send-message-btn">
        <button type="submit">
          <BiSend size='2rem' />
        </button>
      </div>
    </form>
    //  </PopUpModal>
  )
}

export default ChannelForm