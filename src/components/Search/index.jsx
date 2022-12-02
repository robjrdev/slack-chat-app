import React, { useState, useEffect, useImperativeHandle, forwardRef,} from 'react';
import InputPlacholder from '../input/inputPlacholder';
import { ClearTextIcon } from '../input/inputIcons';
import { getAllUsers } from '../../api/api';
import userProfileStore from '../../store/userProfile';
import useReceiverStore from '../../store/receiverProfile';
import { SearchIcons } from '../input/inputIcons';
import { BiSearchAlt } from 'react-icons/bi';

const Search = forwardRef(({}, ref) => {
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

  const LoadUsers = async () => {
    await setAllUsers([]);
    const arrVal = await getAllUsers(profile);
    await setAllUsers(arrVal);
  };

  useEffect(() => {
    userInput.trim() === '' || userInput.trim() === 'undefined'
      ? setShowSearchResult(false)
      : setShowSearchResult(true);
    return () => {};
  }, [userInput]);

  const onChangeInput = e => {
    setUserInput(e.target.value);
  };

  const thisisCode = ({uid, id}) => { 
    const info = {
      receiver_id: id,
      receiver_uid: uid,
    }
   overwriteReceiver(info);
   setUserInput('')
  };
  return (
    <div className="search-input-container">
      <div className="input-container">
        <input
          className="input-container__textbox"
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          onClick={LoadUsers}
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <InputPlacholder display="Search Email..." />
        {userInput.trim() === '' && <SearchIcons/>}
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
                        onClick={()=>{thisisCode({uid: obj.uid, id: obj.id})}}
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
  );
});

export default Search;
