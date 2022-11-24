import React from 'react';
import AccordionMenu from '../../../components/AccordionMenu';
import { AccordionItem } from '../../../components/AccordionMenu/AccordionItem';
import { Link } from 'react-router-dom';

const DirectMessages = () => {
  return (
    <div className="direct-messages">
      <AccordionMenu>
        <AccordionItem id="menu" title="Direct Messages">
          <ul>
            <li>
              <Link to="/directMessagesItem">User1</Link>
            </li>
          </ul>
        </AccordionItem>
      </AccordionMenu>
    </div>
  );
};

export default DirectMessages;
