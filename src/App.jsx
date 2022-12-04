import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import TopNav from './layout/TopNav';
import userProfileStore from "./store/userProfile";
import React, { useEffect } from 'react'

window.store = {
  mainSearch: '',
  direcMessage: [],  
};



function App() {
  const { profile, overwriteProfile, clearProfile } = userProfileStore(
    (state) => ({
      profile: state.profile,
      overwriteProfile: state.overwriteProfile,
      clearProfile: state.clearProfile,
    })
  );  
  return (
    <>
      {profile ? <Home /> : <LogIn />}
    </>
  );
}

export default App;
