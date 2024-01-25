import React from "react";
import SearchBar from "./SearchBar";
import BookContainer from "./BookContainer";

export type Book = {
  title: string;
  author: string;
  photoUrl?: string;
  type: string;
};

const BooksContainer = ({ books }: { books: Book[] }) => {
  return (
    <>
      <SearchBar />
      <div className="books-container">
        {books.map((book, i) => (
          <BookContainer
            key={i}
            id={i.toString()}
            title={book.title}
            author={book.author}
            photoUrl={book?.photoUrl}
          />
        ))}
      </div>
    </>
  );
};

export default BooksContainer;
