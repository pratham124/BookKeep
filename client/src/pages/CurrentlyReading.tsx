import React from "react";
import BooksContainer from "../components/BooksContainer";
import { reading } from "./Dashboard";

export const books = [];

const CurrentlyReading = () => {
  return <BooksContainer books={reading} />;
};

export default CurrentlyReading;
