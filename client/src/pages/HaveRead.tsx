import BooksContainer, { BookData } from "../components/BooksContainer";
import { AuthContextType } from "../store/authStore";
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loading";

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
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { books } = useLoaderData() as { books: BookData[] };

  if (isLoading) return <Loader />;
  return <BooksContainer books={books} />;
};

export default HaveRead;
