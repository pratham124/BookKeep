import BooksContainer from "../components/BooksContainer";
import { haveRead } from "./Dashboard";
import { AuthContextType } from "../store/authStore";
import { LoaderFunction, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const loader =
  (authContext: AuthContextType): LoaderFunction =>
  async ({ request }) => {
    const { id, token } = authContext;
    if (!token) {
      toast.error("You must be logged in to view this page");
      return redirect("/login");
    }
    const userInput = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(userInput);
    const url =
      "https://9ahmtltyr1.execute-api.us-west-2.amazonaws.com/prod/books?";
    let params = "userId=" + id + "&type=read";
    if (userInput.searchInput) {
      params += "&title=" + userInput.searchInput;
    }
    try {
      const response = await axios.get(url + params, {
        headers: {
          Authorization: token,
        },
      });
      return {
        books: response.data.items,
      };
    } catch (error) {
      console.log(error);
      toast.error("Oops, something went wrong!");
      return error;
    }
  };

const HaveRead = () => {
  return <BooksContainer books={haveRead} />;
};

export default HaveRead;
