import React from "react";
import { useNavigate } from "react-router-dom";

const BookContainer = ({
  id,
  title,
  author,
  photoUrl,
}: {
  id: string;
  title: string;
  author: string;
  photoUrl?: string;
}) => {
  const navigate = useNavigate();
  const handleBookClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/dashboard/book/${id}`);
  };
  return (
    <div className="book-container" onClick={handleBookClick}>
      <img
        src={photoUrl ? photoUrl : "https://via.placeholder.com/150"}
        alt="book cover"
      />
      <div className="book-info">
        <div>{title}</div>
        <div>By {author}</div>
      </div>
    </div>
  );
};

export default BookContainer;
