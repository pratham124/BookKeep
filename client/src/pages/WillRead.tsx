import React from "react";
import { books } from "./CurrentlyReading";
import BooksContainer from "../components/BooksContainer";
import { willRead } from "./Dashboard";
// import { useDashboardContext } from "./Dashboard";

const WillRead = () => {
  return <BooksContainer books={willRead} />;
};

export default WillRead;
