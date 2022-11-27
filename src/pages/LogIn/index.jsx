import React, { useEffect, useState, useRef } from "react";
import { loginAccount, createNewAccount } from "../../api/api";
import userProfileStore from "../../store/userProfile";
import TextInput from "../../components/input/textBox";
import { _ } from 'lodash'

const SignInForm = ({getProfile}) => {  
  const registryEmail = useRef();
  const registryPassword = useRef();

  const clearTransaction = () => {
    registryEmail.current.clearValue();
    registryPassword.current.clearValue();
    registryPasswordConfirm.current.clearValue();
  }

  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    (state) => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );

  const handleLogin = (e) => {    
    let email = document.querySelector('[data-inputname=signmail]').value 
    let pword = document.querySelector('[data-inputname=signpw]').value
    if (email.trim() === "" || pword.trim() ==="") {
      alert(" All fields must be filled") 
      return
    }

    console.log(loginAccount({ email: email, password: pword}))
    loginAccount({ email: email, password: pword}).then((credentials) => {
      (!_.isEmpty(credentials)) &&  overwriteProfile({ ...credentials });     
    })   
    clearTransaction();  
    e.preventDefault();
  };
  return (
    <div className="flex-column">      
      <TextInput ref={registryEmail} name="signmail" placeholderText="Enter Email Address" email/>
      <TextInput ref={registryPassword} name="signpw" placeholderText="Password" password/>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );  
};


const SignUpForm = () => {
  const registryEmail = useRef();
  const registryPassword = useRef();
  const registryPasswordConfirm = useRef();

  const clearTransaction = () => {
    registryEmail.current.clearValue();
    registryPassword.current.clearValue();
    registryPasswordConfirm.current.clearValue();
  }

  const handleSignUp = async (e) => {  
    e.preventDefault()
    let email = document.querySelector('[data-inputname=registermail]').value 
    let pword = document.querySelector('[data-inputname=registerpw]').value
    let pwordconfirm = document.querySelector('[data-inputname=registerpwconfirm]').value
    if (email.trim() === "" || pword.trim() === "" || pwordconfirm.trim() === "") {
      alert(" All fields must be filled") 
      return
    } 
    if (pword.trim()  !== pwordconfirm.trim() ) {
      alert("Passwords do not match")
      return
    }
    await createNewAccount({ email: email, password: pword, password_confirmation: pwordconfirm })
    clearTransaction();
  }

  return (
    <div className="flex-column">
      <div>Registration Form</div>
      <TextInput ref={registryEmail} name="registermail" placeholderText="Enter Email Address" email/>
      <TextInput ref={registryPassword} name="registerpw" placeholderText="Password" password/>
      <TextInput ref={registryPasswordConfirm} name="registerpwconfirm" placeholderText="Confirm Password" password/>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};


const LogIn = ({getProfile}) => {
  const [signUp, setSignUp] = useState(false);
  const handleClick = () => {
    setSignUp(!signUp);
  };
  
  return (
    <div className="flex-column" style={{alignItems: "center", justifyContent: "center", height: "100vh"}}>
      {!signUp ? <SignInForm getProfile={getProfile}/> : <SignUpForm />}
      <div style={{cursor: "pointer"}} onClick={handleClick}>
        {!signUp ? "New User" : "Back to Login"}
      </div>
    </div>
  );
};

export default LogIn;


// const LogIn = () => {
//   return <div>LogIn</div>;
// };

// export default LogIn;
