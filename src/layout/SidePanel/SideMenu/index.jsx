import React from 'react';
import DraftsSent from './DraftsSent';
import MentionsReactions from './MentionsReactions';
import SideDirectMessages from './SideDirectMessages';
import { Link } from 'react-router-dom';
import { TbMessages } from 'react-icons/tb';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { GoMention } from 'react-icons/go';
import { MdSendAndArchive } from 'react-icons/md';

import Threads from './Threads';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul className="flex-column">
        <li>
          <Link to="/threads" className="flex-row">
            <BiMessageRoundedDetail />
            <Threads />
          </Link>
        </li>
        <li>
          <Link to="/sideDirectMessage" className="flex-row">
            <TbMessages />
            <SideDirectMessages />
          </Link>
        </li>
        <li>
          <Link to="/mentionsreactions" className="flex-row">
            <GoMention />
            <MentionsReactions />
          </Link>
        </li>
        <li>
          <Link to="/draftsSent" className="flex-row">
            <MdSendAndArchive />
            <DraftsSent />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
