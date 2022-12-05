import React, { useEffect, useState, useRef } from 'react'
import { getDirectMessages } from '../../api/api';
import userProfileStore from '../../store/userProfile'
import { HeliLoad } from '../Loading';
import useReceiverStore from '../../store/receiverProfile';
const Conversation = ({ receiver_id }) => {

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
    }));


  const myInterval = useRef();

  const [conversationList, setConversationList] = useState([]);

  useEffect(() => {
    LoadData();
  }, [receiver_id]);

  const intervalTrigger = () => {
    clearInterval(myInterval.current);
    myInterval.current = setInterval(RealTimeConversation, 1000);
  }

  const LoadData = async () => {
    window.store.mainSearch = ''
    await clearInterval(myInterval.current);
    await LoadConversation()
    await intervalTrigger();
  }

  const LoadConversation = async () => {
    await setConversationList([]);
    const arrVal = await getDirectMessages({ header: profile }, receiver_id, receiver.class);
    const arrValues = await [...new Map(arrVal.map(item => [item['id'], item])).values()]
    await setConversationList(arrValues);
    window.store.direcMessage = arrValues;
  };

  const RealTimeConversation = async () => {
    if (window.store.direcMessage === 0) return
    const arrVal = await getDirectMessages({ header: profile }, receiver_id, receiver.class);
    const arrValues = await [...new Map(arrVal.map(item => [item['id'], item])).values()]
    window.store.direcMessage !== arrValues && setConversationList(arrValues)
  };
  return (
    <>
      {conversationList.length > 0 && conversationList.map((obj, idx) => {
        return <div className="conversation-text" key={idx} style={{ textAlign: `${obj.receiver.id === receiver_id && 'right'}`, alignSelf: `${obj.receiver.id === receiver_id && 'end'}` }}>
          <div className="sender-name">{obj.sender.uid}</div>
          <div className="conversation-body">{obj.body}</div>
        </div>
      }
      )}
      {/* {conversationList.length === 0 && <HeliLoad />} */}
    </>
  )
}

export default Conversation