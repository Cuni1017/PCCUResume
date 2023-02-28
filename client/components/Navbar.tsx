"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store, setUser, cleanUser } from "../redux/store";
import Link from "next/link";
import { getCookie } from "cookies-next";
import NavbarItem from "./NavbarItem";
import NavbarItemMenu from "./NavbarItemMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import AuthModal from "./AuthModal/AuthModal";
import Profile from "./Profile";

import { axiosInstanceNext } from "@/axiosInstance.ts";

const Navbar = () => {
  const user = useSelector((state: Store) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkJWT = useCallback(async () => {
    try {
      const JWT = getCookie("JWT");
      if (JWT) {
        const res = await axiosInstanceNext.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        });
        dispatch(setUser(res.data));
      } else {
        dispatch(cleanUser());
        console.log("請重新登入");
      }
    } catch (error) {
      console.log(error, "Navbar");
    }
    setLoading(false);
  }, [dispatch]);

  const JWT = getCookie("JWT");
  useEffect(() => {
    if (!JWT) {
      setLoading(false);
    } else {
      checkJWT();
      const interval = setInterval(() => {
        checkJWT();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [JWT, checkJWT]);

  const CPNLinks = [
    { label: "徵才", link: "/search" },
    { label: "刊登", link: "/jobs/new" },
  ];

  const TCHLinks = [
    { label: "審核廠商", link: "/admin" },
    { label: "審核學生", link: "/tanstack" },
  ];

  return (
    <div className="bg-white border-0 border-b border-solid border-b-gray-200 h-16">
      <div className="m-auto h-full max-w-screen-xl flex justify-between items-center">
        <div className="text-2xl flex items-center h-full">
          <div className="mr-8">
            <Link href="/">PCCUResume</Link>
          </div>
          <div className="hidden md:flex gap-4 h-full items-center">
            <NavbarItem label="找工作" link="/jobs" />
            {/* <NavbarItem label="徵才" link="/search" /> */}
            <NavbarItemMenu label="廠商" links={CPNLinks} />
            <NavbarItemMenu label="教師" links={TCHLinks} />
          </div>
        </div>
        <div className="mr-3 flex gap-2">
          {loading ? (
            <CircularProgress className="mr-10" />
          ) : user.id ? (
            <Profile user={user} />
          ) : (
            <>
              <AuthModal isSignin />
              {/* <AuthModal isSignin={false} /> */}
              <Link href="/register">
                <Button variant="contained">註冊</Button>
              </Link>
            </>
          )}
          <div className="md:hidden flex items-center">
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
