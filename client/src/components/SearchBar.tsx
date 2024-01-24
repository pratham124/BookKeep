import { Form, useSubmit } from "react-router-dom";

const SearchBar = () => {
  const submit = useSubmit();

  return (
    <Form className="tb" onSubmit={(e) => submit(e.currentTarget)}>
      <div className="td">
        <input
          type="search"
          name="searchInput"
          id="search"
          defaultValue={""}
          placeholder={"Search for a book"}
          className="search-input"
        />
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
