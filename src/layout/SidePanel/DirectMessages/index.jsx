import React from 'react';
import AccordionMenu from '../../../components/AccordionMenu';
import { AccordionItem } from '../../../components/AccordionMenu/AccordionItem';
import useContactsStore from '../../../store/userContacts';
import userProfileStore from '../../../store/userProfile';
import DirectMessagesItem from './DirectMessagesItem';

const DirectMessages = () => {
  const contacts = useContactsStore((state) => state.contacts)
  const {profile} = userProfileStore (state => ({profile: state.profile}))
  
  return (
    <div className="direct-messages">
      <AccordionMenu>
        <AccordionItem id="menu" title="Direct Messages">         
          <DirectMessagesItem contacts={contacts}/>
        </AccordionItem>
      </AccordionMenu>
    </div>
  );
};

export default DirectMessages;
