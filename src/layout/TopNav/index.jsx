import React from 'react';
import { Search } from '../../components/Search';
import Menu from './Menu';
import User from './User';

const TopNav = () => {
  return (
    <div className="top-nav flex-row">
      <Menu />
      <Search />
      <User />
    </div>
  );
};

export default TopNav;
