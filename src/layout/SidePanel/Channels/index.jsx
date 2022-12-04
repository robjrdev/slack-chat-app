import React, { useState, useEffect } from 'react';
import AccordionMenu from '../../../components/AccordionMenu';
import { AccordionItem } from '../../../components/AccordionMenu/AccordionItem';
import ChannelItem from './ChannelItem';
import { Link } from 'react-router-dom';
import InputPlacholder from '../../../components/input/inputPlacholder';
import ChannelForm from './ChannelForm';
import { PopUpModal } from '../../../components/Modal';
import { getAllChannels } from '../../../api/api';
import userProfileStore from '../../../store/userProfile'


const Channels = () => {
  const [ isShown, setIsShown] = useState(false);
  const [ reload, setReload] = useState(false);
  const [channelList, setChannelList] = useState([]);


  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  useEffect(() => {
    LoadChannels();
  }, []);

  const LoadChannels = async () => {
    await setChannelList([]);
    const arrVal = await getAllChannels(profile);
    await setChannelList(arrVal);
  };

  const showModal = () => {
    setIsShown(true)
  }
  const closeModal = () => {
    setIsShown(false)
  }

  const toggleModal = () => {
    setIsShown(!isShown)
  }

  const reloadChannel = () =>{
    LoadChannels();
  }
  return (
    <div className="channels flex-row"> 
    <div>
      <AccordionMenu>   
        <AccordionItem id="menu" title="Channels">        
          <ul>
            <li>
              <ChannelItem channelArr={channelList}/>
            </li>
          </ul>
        </AccordionItem>
      </AccordionMenu>
      <button className = "add-chan" onClick={toggleModal}>Add Channel</button>
      </div>   
      {isShown && (<PopUpModal className={isShown}>
        <ChannelForm closeBtn = {closeModal} reloadChannel={reloadChannel}/>
      </PopUpModal>)}
    </div>
  );
};

export default Channels;
