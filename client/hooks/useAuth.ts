import { axiosInstanceNext } from "../axiosInstance.ts";
import { useSelector, useDispatch } from "react-redux";
import { Store, setUser, cleanUser, User } from "@/redux/store";
import Cookies from "js-cookie";

interface UseAuth {
  signin: (
    {
      username,
      password,
    }: {
      username: string;
      password: string;
    },
    handleClose: () => void
  ) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  signout: () => void;
}

export function useAuth(): UseAuth {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();

  const signin = async (
    { username, password }: { username: string; password: string },
    handleClose: () => void
  ) => {
    try {
      const res = await axiosInstanceNext.post("/api/auth/signin", {
        username,
        password,
      });

      if (res.status === 200) {
        const { data } = res;
        dispatch(setUser(data));
        handleClose();
      }
    } catch (error) {
      console.log(error, "useAuth");
    }
  };

  const signup = async () => {};

  const signout = () => {
    Cookies.remove("JWT");
    dispatch(cleanUser());
  };

  return { signin, signup, signout };
}
