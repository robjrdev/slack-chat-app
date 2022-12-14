import React, { useState } from 'react';
import Channels from './Channels';
import Server from './Server';
import SideMenu from './SideMenu';
import DirectMessages from './DirectMessages';
import { NewMessage } from '../../components/NewMessage';
import { Link } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import userProfileStore from '../../store/userProfile';
import useReceiverStore from '../../store/receiverProfile';

const SidePanel = () => {
  const { clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );
  const { clearReceiver } = useReceiverStore()
  
  const handleLogOut = () => {
    clearProfile();
    clearReceiver();
  };

  return (
    <div className="side-panel flex-column">
      <ul>
        <li className="flex-row" style={{ justifyContent: 'flex-end', paddingRight: '0.5rem'  }}>
          {/* <Link to="/server">Server</Link> */}
          <Link to="/newMessage">
            <AiFillMessage fontSize="1.5rem"/>
          </Link>
        </li>
        {/* <div>
          <SideMenu />
        </div> */}
        <Channels />
        <DirectMessages />
      </ul>
      <div className="log-out" onClick={handleLogOut} style={{paddingLeft: '0.5rem'}} >
        <FiLogOut fontSize="1.5rem" />
      </div>
    </div>
  );
};

export default SidePanel;
