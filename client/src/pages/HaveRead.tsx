import React from "react";
import { books } from "./CurrentlyReading";
import BooksContainer from "../components/BooksContainer";

const HaveRead = () => {
  return <BooksContainer books={books} />;
};

export default HaveRead;
