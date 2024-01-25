import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { loader as profileLoader } from "./pages/Profile";
import { loader as currentlyReadingLoader } from "./pages/CurrentlyReading";
import { loader as willReadLoader } from "./pages/WillRead";
import { loader as haveReadLoader } from "./pages/HaveRead";
import { loader as bookLoader } from "./pages/Book";
import CurrentlyReading from "./pages/CurrentlyReading";
import HaveRead from "./pages/HaveRead";
import Profile from "./pages/Profile";
import WillRead from "./pages/WillRead";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import { AuthContextType, useAuth } from "./store/authStore";

function App() {
  const authContext = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction(authContext as AuthContextType),
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <CurrentlyReading />,
              loader: currentlyReadingLoader(authContext as AuthContextType),
            },
            {
              path: "have-read",
              element: <HaveRead />,
              loader: haveReadLoader(authContext as AuthContextType),
            },
            {
              path: "profile",
              element: <Profile />,
              loader: profileLoader(authContext as AuthContextType),
            },
            {
              path: "will-read",
              element: <WillRead />,
              loader: willReadLoader(authContext as AuthContextType),
            },
            {
              path: "add-book",
              element: <AddBook />,
            },
            {
              path: "book/:id",
              element: <Book />,
              loader: bookLoader(authContext as AuthContextType),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
