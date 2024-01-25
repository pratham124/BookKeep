import React from "react";
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { AuthContextType, useAuth } from "../store/authStore";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthService } from "../services/AuthService";

export const loader =
  (authContext: AuthContextType): LoaderFunction =>
  async () => {
    const { id, token, userName } = authContext;
    if (!token) {
      toast.error("You must be logged in to view this page");
      return redirect("/login");
    }
    const url =
      "https://9ahmtltyr1.execute-api.us-west-2.amazonaws.com/prod/books?";
    const params = "userId=" + id;

    try {
      const response = await axios.get(url + params, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      const books = response.data.items;
      let booksRead = 0;
      let booksReading = 0;
      let booksToRead = 0;
      books.forEach((book: { type: string }) => {
        if (book.type === "read") {
          booksRead++;
        } else if (book.type === "reading") {
          booksReading++;
        } else if (book.type === "to-read") {
          booksToRead++;
        }
      });
      return {
        booksRead,
        booksReading,
        booksToRead,
        userName,
      };
    } catch (error) {
      console.log(error);
      toast.error("Oops, something went wrong!");
      return error;
    }
  };

const Profile = () => {
  const navigate = useNavigate();
  const nagivation = useNavigation();
  const isLoading = nagivation.state === "loading";
  const { booksRead, booksReading, booksToRead, userName } =
    useLoaderData() as {
      booksRead: number;
      booksReading: number;
      booksToRead: number;
      userName: string;
    };
  const authService = new AuthService();
  const { setAuthInfo } = useAuth() as AuthContextType;
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await authService.logout();
    setAuthInfo({ id: null, token: null, userName: null });
    navigate("/");
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="profile">
      <div className="stats">
        <div className="stat">
          <h3>{booksRead} Books Read</h3>
        </div>
        <div className="stat">
          <h3>{booksReading} Books Reading</h3>
        </div>
        <div className="stat">
          <h3>{booksToRead} Books To Read</h3>
        </div>
      </div>
      <div className="profile-info">
        <h3>Profile</h3>
        <p>Username: {userName} </p>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
