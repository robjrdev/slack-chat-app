import React from 'react';
import AccordionMenu from '../../../components/AccordionMenu';
import { AccordionItem } from '../../../components/AccordionMenu/AccordionItem';
import ChannelItem from './ChannelItem';
import { Link } from 'react-router-dom';

const Channels = () => {
  return (
    <div className="channels">
      <AccordionMenu>
        <AccordionItem id="menu" title="Channels">
          <ul>
            <li>
              <Link to="/channelItem">Channel1</Link>
            </li>
          </ul>
        </AccordionItem>
      </AccordionMenu>
    </div>
  );
};

export default Channels;
