import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
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
            },
            {
              path: "have-read",
              element: <HaveRead />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "will-read",
              element: <WillRead />,
            },
            {
              path: "add-book",
              element: <AddBook />,
            },
            {
              path: "book/:id",
              element: <Book />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
