import React from "react";
import BooksContainer from "../components/BooksContainer";

export const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
  },
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
  },
  {
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
  },
  {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
  },
  {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
  },
];

const CurrentlyReading = () => {
  return <BooksContainer books={books} />;
};

export default CurrentlyReading;
