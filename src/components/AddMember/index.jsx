import React from 'react'
import { TransparentButton } from '../Button';
import InputPlacholder from '../input/inputPlacholder';
import { BiSend } from 'react-icons/bi';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ClearTextIcon, SearchIcons } from '../input/inputIcons';
import { addUserToChannel, getAllUsers } from '../../api/api';
import userProfileStore from '../../store/userProfile';
import useReceiverStore from '../../store/receiverProfile';
import useAllUsersStore from '../../store/allUsers';
import { _ } from 'lodash'


const AddMember = ({ closeBtn, memberList }) => {
  const [channelMembers, setChannelMembers] = useState([])

  const [userInput, setUserInput] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
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
    LoadUsers();
  }, []);
  // useEffect(() => {
  //   setChannelMembers(memberList)
  // })

  const LoadUsers = async () => {
    await setAllUsers([]);
    const arrVal = await getAllUsers(profile);
    await setAllUsers(arrVal);

  };


  useEffect(() => {
    userInput.trim() === '' || userInput.trim() === 'undefined'
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    return () => { };
  }, [userInput]);

  const onChangeInput = e => {

    setUserInput(e.target.value);
  };


  const handleAddMember = async ({ id }) => {
    await addUserToChannel({ channel_id: receiver.receiver_id, member_id: id, header: profile })
    setUserInput('')
  };
  return (
    <>
      <div className="search-input-container">
        <div className="search-container">
          <input
            className="search-bar-textbox"
            placeholder=" "
            value={userInput}
            onChange={onChangeInput}
            onClick={LoadUsers}
            autoComplete="off"
            autoCorrect="off"
          ></input>
          <InputPlacholder display="Search To Add Member" />
          {userInput.trim() === '' && <SearchIcons />}
          {userInput.trim() !== '' && (
            <div
              className="placeholder-icons-container"
              onClick={() => {
                setUserInput('');
              }}
            >
              <ClearTextIcon />
            </div>
          )}
        </div>
        {showSearchResult && (
          <div className="searched-item-container">
            <div>
              {allUsers.length > 0 &&
                allUsers
                  .filter(allRecords =>
                    allRecords.uid
                      .toLowerCase()
                      .includes(`${userInput.toLowerCase().trim()}`)
                  )
                  .map((obj, idx) => {
                    return (
                      <div key={idx} className="searched-item">
                        <div
                          style={{ padding: '0 0.5rem' }}
                          data-usercode={obj.id}
                          onClick={() => { handleAddMember({ uid: obj.uid, id: obj.id }) }}
                        >
                          <div>{obj.uid}</div>
                        </div>
                      </div>
                    );
                  })}
              {allUsers.length === 0 && <div>Loading...</div>}
            </div>
          </div>
        )}
      </div>
      <div>{memberList.map((obj, idx) =>
      (<div className="member-list" key={idx}>
        <div>{obj.uid}</div>
      </div>)
      )}</div>
    </>
  )
}

export default AddMember