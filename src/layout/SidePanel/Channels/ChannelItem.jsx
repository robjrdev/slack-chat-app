import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../../api/api';
import userProfileStore from '../../../store/userProfile';

const ChannelItem = ({channelArr = []}) => {
  const [channelList, setChannelList] = useState([]);

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  useEffect(() => {
    
    if (Array.isArray(channelArr) && channelArr.length > 0 ) {
      LoadChannels();
    }
  }, [channelArr]);



  const LoadChannels = async () => {
   
      await setChannelList([]);
      const arrVal = await getAllChannels(profile);
      await setChannelList(arrVal);
    
  };

  // const LoadChannels = async () => {
  //   await setChannelList([]);
  //   const arrVal = await getAllChannels(profile);
  //   await setChannelList(arrVal);
  // };
  return (
    <>    
      <div>
        {channelList.length > 0 &&
          channelList.map((obj, idx) => {
              return (
                <div key={idx} className="searched-item">
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
