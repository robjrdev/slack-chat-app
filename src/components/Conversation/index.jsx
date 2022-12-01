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
    debugger
    await setConversationList([]);
    const arrVal = await getDirectMessages({header: profile}, receiver_id, 'User');   
    await setConversationList(arrVal);
    // debugger
};
//  console.log(conversationList)
  return (
    <div>{conversationList.length > 0 && conversationList.map((obj, idx) => 
      (<div className="conversation-text" key={idx}>
        {obj.body}
      </div>)
    )}</div>
  )
}

export default Conversation