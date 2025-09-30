import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Para from "./Components/Para.jsx";
import CreateVlog from "./Components/CreateVlog.jsx";
import Favorite from "./Components/Favorite.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import TotalVlogs from "./Components/TotalVlogs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Para /> },
      { path: "/Favorite", element: <Favorite /> },
      { path: "/Api", element: <TotalVlogs /> },
      { path: "/Create", element: <CreateVlog /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <UserProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
