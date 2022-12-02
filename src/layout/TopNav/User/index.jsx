import React from 'react';
import userProfileStore from '../../../store/userProfile';

const User = () => {
  const {profile} = userProfileStore();
  return <div className="user">{profile.uid}</div>;
};

export default User ;