import { axiosInstanceNext } from "../axiosInstance.ts";
import { useSelector, useDispatch } from "react-redux";
import { Store, setUser, cleanUser, User } from "@/redux/store";
import { FormData } from "../app/register/components/RegisterForm";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

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
  signup: ({
    identity,
    username,
    password,
    name,
    email,
    pccuId,
    teacherId,
    companyName,
    companyTitle,
    companyNumber,
    companyCounty,
    companyDistrict,
    companyAddress,
  }: FormData & {
    identity: string;
    handleNext: () => void;
    handleComplete: () => void;
  }) => Promise<void>;
  signout: () => void;
  isFetching: boolean;
}

export function useAuth(): UseAuth {
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

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
        // if (user.role === "USER") router.replace("/regiter");
        // else router.replace("/");
      }
    } catch (error) {
      console.log(error, "useAuth");
    }
  };

  const signup = async ({
    identity,
    username,
    password,
    name,
    email,
    pccuId,
    teacherId,
    companyName,
    companyTitle,
    companyNumber,
    companyCounty,
    companyDistrict,
    companyAddress,
    handleNext,
    handleComplete,
  }: FormData & {
    identity: string;
    handleNext: () => void;
    handleComplete: () => void;
  }) => {
    setIsFetching(true);
    try {
      const res = await axiosInstanceNext.post("/api/auth/signup", {
        identity,
        username,
        password,
        name,
        email,
        pccuId,
        teacherId,
        companyName,
        companyTitle,
        companyNumber,
        companyCounty,
        companyDistrict,
        companyAddress,
      });

      if (res.status === 200) {
        handleNext();
        handleComplete();
      }
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      // console.log(error, "useAuth");
    }
    setIsFetching(false);
  };

  const signout = () => {
    Cookies.remove("JWT");
    dispatch(cleanUser());
    router.replace("/");
  };

  return { signin, signup, signout, isFetching };
}
