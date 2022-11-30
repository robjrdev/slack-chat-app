import React, { useState, useEffect } from 'react';
import { getAllChannels } from '../../../api/api';
import userProfileStore from '../../../store/userProfile';

const ChannelItem = () => {
  const [channelList, setChannelList] = useState([]);

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    state => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  useEffect(() => {
    LoadChannels();
  }, []);

  const LoadChannels = async () => {
    await setChannelList([]);
    const arrVal = await getAllChannels(profile);
    await setChannelList(arrVal);
  };
  return (
    <>
      {/* <div>Channel1</div>
    <div>Channel2</div> */}
      <div>
        {channelList.length > 0 &&
          channelList

            .map((obj, idx) => {
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
