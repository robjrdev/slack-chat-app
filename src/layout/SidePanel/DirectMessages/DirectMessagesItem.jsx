import React, { useState, useEffect } from 'react';
import useReceiverStore from '../../../store/receiverProfile';

const DirectMessagesItem = ({ contacts }) => {
  const [myContacts, setMyContacts] = useState([])

  useEffect(() => {
    LoadDirectContacts();
  }, [])

  const LoadDirectContacts = async () => {
    const arrValues = await [...new Map(contacts.map(item => [item['contact_id'], item])).values()]
    await setMyContacts(arrValues)
  }

  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
    }))

  const thisisCode = ({ uid, id }) => {
    const receiverInfo = {
      receiver_id: id,

      name: uid,
      class: 'User'
    };
    overwriteReceiver(receiverInfo);
    //  alert(uid)
    //  alert(id)
    //  addContact(contactInfo);
    //  setUserInput('')
    location.reload();
    //  setInterval( setUserInput(''),2000)
  };

  return (
    <>
      <ul>
        <li>
          {myContacts.length > 0 &&
            myContacts.map((obj, idx) => {
              return (
                <div
                  key={idx}
                  className="contact-email side-panel-items"
                  data-usercode={obj.id}
                  onClick={() => {
                    thisisCode({ uid: obj.contact_uid, id: obj.contact_id });
                  }}
                >
                  {obj.contact_uid}
                </div>
              );
            })}
          {myContacts.length === 0 && <div>No Contacts Available</div>}
        </li>
      </ul>
    </>
    // <>
    // {contacts.map((obj, idx) => {
    //   return <div key={idx} div className="contact-email" style={{fontSize:'.8rem'}}>
    //     {obj.contact_uid}
    //   </div>
    // })}
    // </>
  );
};

export default DirectMessagesItem;
