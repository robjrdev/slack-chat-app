import React from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchInput from '../input/search';

export const Search = () => {
  return (
    //  <div className="search">
    //    <form className="search-form flex-row" action="">
    //     <input
    //       type="text"
    //       placeholder="Search Server"
    //       className="search-input"
    //     />
    //     <button type="submit">
    //       <BiSearch />
    //     </button>
    //   </form>

    // </div>

    <div className="search">
      <SearchInput />
    </div>
  );
};
