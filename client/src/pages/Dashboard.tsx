import { Outlet } from "react-router-dom";
import BigNav from "../components/BigNav";
// import { AuthContextType, useAuth } from "../store/authStore";
// import { useEffect } from "react";

export const user = {
  name: "John Doe",
  email: "jonh@gmail.com",
  userName: "johndoe",
};

export const willRead = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    photoUrl:
      "https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png",
  },
  {
    id: 2,
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    photoUrl: "",
  },
  {
    id: 3,
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    photoUrl: "",
  },
];

export const haveRead = [
  {
    id: 4,
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    photoUrl: "",
    type: "read",
  },
  {
    id: 5,
    title: "The Silmarillion",
    author: "J.R.R. Tolkien",
    photoUrl:
      "https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png",
    type: "read",
  },
];

export const reading = [
  {
    id: 6,
    title: "The Children of Húrin",
    author: "J.R.R. Tolkien",
    photoUrl:
      "https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png",
    type: "reading",
  },
];

//
const Dashboard = () => {
  return (
    <main>
      <BigNav />
      <div className="dashboard-page">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
