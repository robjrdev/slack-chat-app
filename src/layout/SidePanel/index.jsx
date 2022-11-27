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

const SidePanel = () => {
  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );
  
  const handleLogOut = () => {
    clearProfile();
  };

  return (
    <div className="side-panel flex-column">
      <ul>
        <li className="flex-row" style={{ justifyContent: 'space-between' }}>
          <Link to="/server">Server</Link>
          <Link to="/newMessage">
            <AiFillMessage />
          </Link>
        </li>
        <div>
          <SideMenu />
        </div>
        <Channels />
        <DirectMessages />
      </ul>
      <div className="log-out" onClick={handleLogOut}>
        <FiLogOut />
      </div>
    </div>
  );
};

export default SidePanel;
