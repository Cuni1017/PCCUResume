import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "../home/Home";
import Login from "../user/Login";
import Signup from "../user/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
