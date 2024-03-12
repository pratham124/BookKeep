import React from "react";
import SearchBar from "./SearchBar";
import BookContainer from "./BookContainer";

export type BookData = {
  id: string;
  title: string;
  author: string;
  photoUrl?: string;
  type: string;
};

const BooksContainer = ({ books }: { books: BookData[] }) => {
  return (
    <>
      <SearchBar />
      <div className="books-container">
        {books.map((book) => (
          <BookContainer
            key={book.id}
            id={book.id}
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
