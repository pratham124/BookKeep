import React from "react";
import { books } from "./CurrentlyReading";
import BooksContainer from "../components/BooksContainer";

const WillRead = () => {
  return <BooksContainer books={books} />;
};

export default WillRead;
