import React from 'react';
import Channels from './Channels';
import Server from './Server';
import SideMenu from './SideMenu';
import DirectMessages from './DirectMessages';
import { NewMessage } from '../../components/NewMessage';
import { Link } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';

const SidePanel = () => {
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
    </div>
  );
};

export default SidePanel;
