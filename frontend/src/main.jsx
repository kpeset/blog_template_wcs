import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import App from "./App";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticlesDetails";
import CreateArticle from "./pages/CreateArticle";
import Register from "./pages/Register";

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
        loader: () =>
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/articles`)
            .then((response) => response.data),
      },
      {
        path: "/articles/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/create",
        element: <CreateArticle />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
