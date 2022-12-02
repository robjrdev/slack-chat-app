import React from 'react';

const DirectMessagesItem = ({contacts}) => {
  
  if(contacts.length === 0) {
    return <div>No Contacts Available</div>
  }
  return(
    <>
    {contacts.map((obj, idx) => {
      return <div key={idx} div className="contact-email" style={{fontSize:'.8rem'}}>
        {obj.contact_uid}
      </div>
    })}
    </>
  );
};

export default DirectMessagesItem;
