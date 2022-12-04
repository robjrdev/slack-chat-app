import React from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { BsSearch } from "react-icons/bs";


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

export const SearchIcons = () => {
  return (
  <div className='icon-container'>
    <BsSearch color="#ccc"/>
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

