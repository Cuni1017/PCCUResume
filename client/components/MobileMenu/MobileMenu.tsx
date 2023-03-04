import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";

const MobileMenu = ({
  setIsMenuShow,
}: {
  setIsMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [STDIsShow, setSTDIsShow] = useState(false);
  const [CPNIsShow, setCPNIsShow] = useState(false);
  const [TCHIsShow, setTCHIsShow] = useState(false);

  const CPNLinks = [
    { label: "徵才", link: "/search" },
    { label: "刊登", link: "/jobs/new" },
  ];

  const TCHLinks = [{ label: "教師管理", link: "/admin" }];

  return (
    <div className="flex flex-col bg-white">
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
          <div className="px-10 flex flex-col cursor-auto">
            {CPNLinks.map((link) => (
              <Link key={link.label} href={link.link}>
                <div className="py-2">{link.label}</div>
              </Link>
            ))}
          </div>
        </MobileMenuItem>
        <MobileMenuItem
          label={"教師"}
          isShow={TCHIsShow}
          setIsShow={setTCHIsShow}
          setIsMenuShow={setIsMenuShow}
        >
          <div className="px-10 flex flex-col cursor-auto">
            {TCHLinks.map((link) => (
              <Link key={link.label} href={link.link}>
                <div className="py-2">{link.label}</div>
              </Link>
            ))}
          </div>
        </MobileMenuItem>
      </ul>
    </div>
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
    <li className="border-0 border-b border-gray-100 border-solid py-2 cursor-pointer">
      <div
        className="h-full text-xl px-5 flex items-center justify-between"
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <span>{label}</span>
        <ExpandMoreIcon />
      </div>
      {isShow ? (
        <div className="py-2" onClick={() => setIsMenuShow(false)}>
          {children}
        </div>
      ) : null}
    </li>
  );
};

const MobileMenuItemList = ({ links }: { links: any }) => {};

export default MobileMenu;
