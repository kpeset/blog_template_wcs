import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import App from "./App";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";

import { UserProvider } from "./services/UserContext";

import "./styles/app.css";
import "./styles/navbar.css";
import "./styles/articles.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/articles",
        element: <Articles />,
        errorElement: <Forbidden />,
        loader: () =>
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/articles`, {
              withCredentials: true,
            })
            .then((response) => response.data)
            .catch((error) => console.error("ERROR", error)),
      },
      {
        path: "/create",
        element: <CreateArticle />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
