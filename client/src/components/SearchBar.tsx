import React, { FormEvent } from "react";
import { Form, useSubmit } from "react-router-dom";

const SearchBar = () => {
  const submit = useSubmit();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget);
  };

  return (
    <Form className="tb" onSubmit={handleSubmit}>
      <div className="td">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          required
        ></input>
      </div>
      <div className="td" id="s-cover">
        <button className="search-btn" type="submit">
          <div id="s-circle"></div>
          <span></span>
        </button>
      </div>
    </Form>
  );
};

export default SearchBar;
