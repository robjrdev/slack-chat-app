import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../../api/api';
import userProfileStore from '../../../store/userProfile';
import useReceiverStore from '../../../store/receiverProfile';

const ChannelItem = ({ channelArr = [] }) => {
  const [channelList, setChannelList] = useState([]);
  const { receiver, overwriteReceiver, clearReceiver } = useReceiverStore(
    state => ({
      receiver: state.receiver,
      overwriteReceiver: state.overwriteReceiver,
      clearReceiver: state.clearReceiver,
    }))

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  useEffect(() => {

    if (Array.isArray(channelArr) && channelArr.length > 0) {
      LoadChannels();
    }
  }, [channelArr]);



  const LoadChannels = async () => {
    await setChannelList([]);
    const arrVal = await getAllChannels(profile);
    await setChannelList(arrVal);

  };

  const getChannel = ({ name, id }) => {
    const channelInfo = {
      name: name,
      class: 'Channel',
      receiver_id: id,
    }
    overwriteReceiver(channelInfo);
  }
  return (
    <>
      <div>
        {channelList.length > 0 &&
          channelList.map((obj, idx) => {
            return (
              <div key={idx} className="searched-item" onClick={() => getChannel({ name: obj.name, id: obj.id })}>
                <div
                  style={{ padding: '0 0.5rem' }}
                // data-usercode={obj.id}
                // onClick={thisisCode}
                >
                  <div>{obj.name}</div>
                </div>
              </div>
            );
          })}
        {channelList.length === 0 && <div>Loading...</div>}
      </div>
    </>
  );
};

export default ChannelItem;
