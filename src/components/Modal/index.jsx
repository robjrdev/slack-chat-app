import React from 'react';

export const Modal = ({ children }) => {
  return <div className="modal-container">{children}</div>;
};

export const PopUpModal = ({children, className}) => {
  const blurEffect = {
    position: "absolute",
    height: "100vh",
    width: "100%",
    backgroundColor: "#000",
    opacity: "0.8",
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
  }
  return(
  <>
    <div style={blurEffect}></div>
    <div className='pop-up-container'> 
      {children}
    </div>
  </>)
}
