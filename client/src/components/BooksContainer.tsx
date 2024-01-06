import React from "react";
import SearchBar from "./SearchBar";

type Book = {
  title: string;
  author: string;
};

const BooksContainer = ({ books }: { books: Book[] }) => {
  return (
    <>
      <SearchBar />
      <div className="books-container">
        {books.map((book, i) => (
          <div className="book-container" key={i}>
            <img src="https://via.placeholder.com/150" alt="book cover" />
            <div className="book-info">
              <div>{book.title}</div>
              <div>By {book.author}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksContainer;
