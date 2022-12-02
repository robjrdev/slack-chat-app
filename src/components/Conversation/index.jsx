import React, { useEffect, useState } from 'react'
import { getDirectMessages } from '../../api/api';
import userProfileStore from '../../store/userProfile'

const Conversation = ({receiver_id}) => {

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );
  const [conversationList, setConversationList] = useState([]);
  
  useEffect(() => {
    // if (conversationList.length > 0) return
    LoadConversation()
  },[receiver_id]);
 

  const LoadConversation = async () => {    
    await setConversationList([]);
    const arrVal = await getDirectMessages({header: profile}, receiver_id, 'User');  
    const arrValues = await [...new Map(arrVal.map(item => [item['id'], item])).values()]
    await setConversationList(arrValues);
};

console.log(conversationList);

  return (
    <>   
      {conversationList.length > 0 && conversationList.map((obj, idx) => 
      {return <div className="conversation-text" key={idx} style={{textAlign: `${obj.receiver.id === receiver_id && 'right'}`, alignSelf: `${obj.receiver.id === receiver_id && 'end'}`}}>
        <div className="sender-name">{obj.sender.uid}</div>
        <div className="conversation-body">{obj.body}</div>
      </div>}
      )}
    </>
  )
}

export default Conversation