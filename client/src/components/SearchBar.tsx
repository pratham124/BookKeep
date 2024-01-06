import React from "react";

const SearchBar = () => {
  return (
    <div className="tb">
      <div className="td">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          required
        ></input>
      </div>
      <div className="td" id="s-cover">
        <button type="submit" className="search-btn">
          <div id="s-circle"></div>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
