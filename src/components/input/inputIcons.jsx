import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";

export const PasswordIcons = ({displayPassword, onClickDisplayPassword}) => {
  return (
    <div className='icon-container'>
      <button className="placeholder-button" onClick={onClickDisplayPassword}>
        {!displayPassword ? (
          <AiFillEyeInvisible color="808080" />
        ) : (
          <AiFillEye color="2980b9" />
        )}
      </button>
    </div>
  );
}

export const IconEmoji = () => {
  return (
  <div className='emoji-icon'>
    <MdInsertEmoticon color="#ccc" fontSize={'1.5rem'} />
  </div>
  )  
}

export const SearchIcons = () => {
  return (
  <div className='search-icon'>
    <BiSearchAlt color="#ccc" fontSize={'1.5rem'} />
  </div>
  )  
}

export const ClearTextIcon = () => {
  return (
  <div className='icon-container'>
    <TfiClose color="#ccc"/>
  </div>
  )  
}

