import React, { useState } from 'react';
import AccordionMenu from '../../../components/AccordionMenu';
import { AccordionItem } from '../../../components/AccordionMenu/AccordionItem';
import ChannelItem from './ChannelItem';
import { Link } from 'react-router-dom';
import InputPlacholder from '../../../components/input/inputPlacholder';
import ChannelForm from './ChannelForm';
import { PopUpModal } from '../../../components/Modal';

const Channels = () => {
  const [ isShown, setIsShown] = useState(false);

  const showModal = () => {
    setIsShown(true)
  }
  const closeModal = () => {
    setIsShown(false)
  }

  const toggleModal = () => {
    setIsShown(!isShown)
  }
  return (
    <div className="channels flex-row">    
      <AccordionMenu>   
        <AccordionItem id="menu" title="Channels">        
          <ul>
            <li>
              <ChannelItem/>
            </li>
          </ul>
        </AccordionItem>
      </AccordionMenu>
      <button onClick={toggleModal}>Add Channel</button>
      {isShown && (<PopUpModal className={isShown}>
        <ChannelForm closeBtn = {closeModal}/>
      </PopUpModal>)}
    </div>
  );
};

export default Channels;
