import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./view/layout/Route";
import axios from "axios";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const baseUrl = "http://localhost:8080/api/v1/auth/login";

const data = {
  username: "cory1",
  password: "1qaz2wsx",
  email: "sadas",
};

function App() {
  useEffect(() => {
    const Login = async () => {
      // const response = await fetch(baseUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      const response = await axios.post(baseUrl, {
        username: "cory1",
        password: "1qaz2wsx",
        email: "sadas",
      });
      console.log(response);

      if (!response === "200") throw new Error("error");

      const { token } = await response.data;
      console.log(token);
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        console.log(Math.floor(Date.now() / 1000));
      } catch (error) {
        console.log(error);
      }
    };

    Login();
  }, []);

  return <RouterProvider router={router}>App</RouterProvider>;
}

export default App;
