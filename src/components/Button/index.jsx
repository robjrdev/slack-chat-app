import React, {useState, useEffect} from 'react'

export const TransparentButton = ({displayText = "X", buttonClick}) => {
  return (
    <>
      <button className='transparent-button' onClick={buttonClick}>{displayText}</button>
    </>
  )
}


export const RoundedButton = ({ displayText = "Sign In", buttonClick, disable=false }) => {
  const[isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    setIsDisabled(disable)
  },[disable]) 

  
  return (
    <div className="rounded-container">
      <button className={`btn-rounded ${isDisabled && 'disabled-button'}`} data-disabled={isDisabled} onClick={buttonClick}>
        {displayText}
      </button>
    </div>
  );
};