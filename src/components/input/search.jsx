import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import InputPlacholder from './inputPlacholder';
import { ClearTextIcon } from './inputIcons';
import { getAllUsers } from "../../api/api";
import userProfileStore from "../../store/userProfile";

const SearchInput = forwardRef(({},ref) => {
  const [userInput, setUserInput] = useState("");
  const [showSearchResult, setShowSearchResult] = useState (false);
  const [allUsers, setAllUsers] = useState([]);

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    (state) => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  useEffect(() => {
    LoadUsers();
  },[])

  const LoadUsers = async () => {
   await setAllUsers([]);
   const arrVal = await getAllUsers(profile)   
   await setAllUsers(arrVal)   
  }
  
  useEffect(() => {
    (userInput.trim() === "" || userInput.trim() === "undefined") ? setShowSearchResult(false):setShowSearchResult(true)  
    return () => {  }
  }, [userInput])

  const onChangeInput = (e) => {
    setUserInput(e.target.value);   
  };

  const thisisCode = () => {
    alert('test')
  }
  return (
    <div className='search-input-container'>
      <div className='input-container'>
        <input
          className="input-container__textbox"
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          onClick={LoadUsers}
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <InputPlacholder display="Search Email..."/>
        {userInput.trim() !== "" && (
          <div
            className="placeholder-icons-container"
            onClick={() => {
              setUserInput("");
            }}
          >
            <ClearTextIcon />
          </div>
        )}      
    </div>
    {showSearchResult && (
          <div className="searched-item-container" >
            <div>
            {allUsers.length > 0 &&
              allUsers.filter(allRecords => allRecords.uid.toLowerCase().includes(`${userInput.toLowerCase().trim()}`)).map((obj, idx) => {
                return (
                  <div key={idx} className='searched-item' >
                    <div style={{padding:"0 0.5rem"}}  data-usercode={obj.id} onClick={thisisCode}>
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
  )
})

export default SearchInput