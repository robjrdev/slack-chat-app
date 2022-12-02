import React, { useState } from 'react';
import SidePanel from '../../layout/SidePanel';
import TopNav from '../../layout/TopNav';
import { Route, Routes } from 'react-router-dom';
import SideDirectMessages from '../../layout/SidePanel/SideMenu/SideDirectMessages';
import MentionsReactions from '../../layout/SidePanel/SideMenu/MentionsReactions';
import DraftsSent from '../../layout/SidePanel/SideMenu/DraftsSent';
import Channels from '../../layout/SidePanel/Channels';
import DirectMessages from '../../layout/SidePanel/DirectMessages';
import Threads from '../../layout/SidePanel/SideMenu/Threads';
import Server from '../../layout/SidePanel/Server';
import { NewMessage } from '../../components/NewMessage';
import { Modal } from '../../components/Modal';
import ChannelItem from '../../layout/SidePanel/Channels/ChannelItem';
import DirectMessagesItem from '../../layout/SidePanel/DirectMessages/DirectMessagesItem';

const Home = () => {
  return (
    <div className="home flex-column">
      <div className="navigation">
        <TopNav />
      </div>
      <div className="home-body flex-row">
        <div className="side-navigation">
          <SidePanel />
        </div>
        <div className="home-display">
          <Modal>
            <Routes>
              <Route path="/newMessage" element={<NewMessage />} />
              <Route path="/threads" element={<Threads />} />
              <Route path="/server" element={<Server />} />
              <Route path="/sideDirectMessage" element={<SideDirectMessages />}/>
              <Route path="/mentionsreactions" element={<MentionsReactions />}/>
              <Route path="/draftsSent" element={<DraftsSent />} />
              <Route path="/channelItem" element={<ChannelItem />} />
              <Route path="/directMessage/:id" element={<DirectMessagesItem />}/>
            </Routes>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
