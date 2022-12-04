import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";


export const PasswordIcons = ({displayPassword, onClickDisplayPassword}) => {
  return (
    <div className='icon-container'>
      <button className="placeholder-button" onClick={onClickDisplayPassword}>
        {!displayPassword ? (
          <AiFillEyeInvisible color="808080" />
        ) : (
          <AiFillEye color="dc143c" />
        )}
      </button>
    </div>
  );
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

