"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store, setUser, cleanUser } from "@/redux/store";
import Link from "next/link";
import { getCookie } from "cookies-next";
import NavbarItem from "./NavbarItem";
import NavbarItemMenu from "./NavbarItemMenu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import AuthModal from "../AuthModal/AuthModal";
import Profile from "../Profile";
import TanstackLinearProgress from "./TanstackLinearProgress";
import AppLinearIndeterminate from "./AppLinearProgress";

import { axiosInstanceNext } from "@/axiosInstance.ts";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isProfileMenuShow, setIsProfileMenuShow] = useState(false);
  const router = useRouter();

  const user = useSelector((state: Store) => state.user);
  const appLoading = useSelector((state: Store) => state.appLoading);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); //jwt

  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      if (windowSize[0] >= 899) setIsMenuShow(false);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

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
        alert("請重新登入");
        router.push("/");
      }
    } catch (error) {
      console.log(error, "Navbar");
    }
    setLoading(false);
  }, [dispatch, router]);

  useEffect(() => {
    const JWT = getCookie("JWT");
    if (!JWT) {
      setLoading(false);
    } else {
      if (!user.id) {
        checkJWT();
      }
      const interval = setInterval(() => {
        checkJWT();
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [checkJWT, user.id]);

  const CPNLinks = [
    { label: "徵才", link: "/search" },
    { label: "刊登", link: "/jobs/new" },
  ];

  const TCHLinks = [{ label: "教師管理", link: "/admin" }];

  return (
    <>
      <div className="bg-white border-0 border-b border-solid border-b-gray-200 h-16">
        <div className="m-auto h-full sm:max-w-[600px] md:max-w-[860px] lg:max-w-[1140px] flex justify-between items-center">
          <div className="text-2xl flex items-center h-full">
            <div className="md:mr-8">
              <Link href="/">PCCUResume</Link>
            </div>
            <div className="hidden md:flex gap-4 h-full items-center">
              <NavbarItem label="找實習" link="/jobs" />
              <NavbarItemMenu label="公司" links={CPNLinks} />
              <NavbarItemMenu label="教師" links={TCHLinks} />
            </div>
          </div>
          <div className="mr-3 flex gap-2 h-full items-center relative">
            {loading ? (
              <CircularProgress className="mr-10" />
            ) : user.id ? (
              <div
                className="h-full flex items-center cursor-pointer"
                onMouseEnter={() => setIsProfileMenuShow(true)}
                onMouseLeave={() => setIsProfileMenuShow(false)}
              >
                <Profile user={user} isProfileMenuShow={isProfileMenuShow} />
              </div>
            ) : (
              <>
                <AuthModal isSignin />
                {/* <AuthModal isSignin={false} /> */}
                <Link href="/register">
                  <Button sx={{ width: "30px" }} variant="contained">
                    註冊
                  </Button>
                </Link>
              </>
            )}
            <div
              className="md:hidden flex items-center cursor-pointer h-full"
              onClick={() => setIsMenuShow(!isMenuShow)}
            >
              {isMenuShow ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </div>
      <TanstackLinearProgress />
      {appLoading.isLoading ? <AppLinearIndeterminate /> : null}
      <MobileMenu isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
    </>
  );
};

export default Navbar;
