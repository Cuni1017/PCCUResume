import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { motion } from "framer-motion";

const MobileMenu = ({
  isMenuShow,
  setIsMenuShow,
}: {
  isMenuShow: boolean;
  setIsMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [STDIsShow, setSTDIsShow] = useState(false);
  const [CPNIsShow, setCPNIsShow] = useState(false);
  const [TCHIsShow, setTCHIsShow] = useState(false);

  const CPNLinks = [
    { label: "徵才", href: "/search" },
    { label: "刊登", href: "/jobs/new" },
  ];

  const TCHLinks = [{ label: "教師管理", href: "/admin" }];

  return (
    <motion.div
      className="flex flex-col bg-white overflow-hidden"
      initial={isMenuShow ? { height: 0, display: "none" } : { height: 0 }}
      animate={
        isMenuShow ? { height: "auto", display: "block" } : { height: 0 }
      }
    >
      <ul className="list-none m-0 py-2 px-0">
        <li className="border-0 border-b border-gray-100 border-solid py-2">
          <Link href="/jobs">
            <div className="h-full text-xl pl-5">找工作</div>
          </Link>
        </li>
        <MobileMenuItem
          label={"廠商"}
          isShow={CPNIsShow}
          setIsShow={setCPNIsShow}
          setIsMenuShow={setIsMenuShow}
        >
          <div className="mt-1 px-10 flex flex-col cursor-auto">
            {CPNLinks.map((link) => (
              <MobileMenuLink key={link.label} link={link} />
            ))}
          </div>
        </MobileMenuItem>
        <MobileMenuItem
          label={"教師"}
          isShow={TCHIsShow}
          setIsShow={setTCHIsShow}
          setIsMenuShow={setIsMenuShow}
        >
          <div className="mt-1 px-10 flex flex-col cursor-auto">
            {TCHLinks.map((link) => (
              <MobileMenuLink key={link.label} link={link} />
            ))}
          </div>
        </MobileMenuItem>
      </ul>
    </motion.div>
  );
};

const MobileMenuLink = ({
  link,
}: {
  link: { label: string; href: string };
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link key={link.label} href={link.href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`py-2 ${hovered ? "bg-gray-100" : ""}`}
      >
        {link.label}
      </div>
    </Link>
  );
};

const MobileMenuItem = ({
  children,
  label,
  isShow,
  setIsShow,
  setIsMenuShow,
}: {
  children: React.ReactNode;
  label: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <li className="border-0 border-b border-gray-100 border-solid py-2 cursor-pointer overflow-hidden">
      <div
        className="h-full text-xl px-5 flex items-center justify-between"
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <span>{label}</span>
        <ExpandMoreIcon />
      </div>
      <motion.div
        className="overflow-hidden"
        initial={isShow ? { height: 0, display: "none" } : { height: 0 }}
        animate={isShow ? { height: "auto", display: "block" } : { height: 0 }}
        onClick={() => setIsMenuShow(false)}
      >
        {children}
      </motion.div>
    </li>
  );
};

export default MobileMenu;
