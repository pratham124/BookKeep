import React from "react";
import { books } from "./CurrentlyReading";
import BooksContainer from "../components/BooksContainer";
import { haveRead } from "./Dashboard";

const HaveRead = () => {
  return <BooksContainer books={haveRead} />;
};

export default HaveRead;
