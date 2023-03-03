"use client";

import Link from "next/link";
import Card from "./Card";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useState } from "react";

const url = "/dashboard";

interface MyLink {
  linkLabel: string;
  href: string;
}

const NavigationBar = () => {
  const myLinks: MyLink[] = [
    { linkLabel: "個人檔案", href: `${url}?ref=profile` },
    { linkLabel: "履歷", href: `${url}/resume` },
    { linkLabel: "作品集", href: `${url}/profolios` },
  ];

  const jobLinks: MyLink[] = [
    { linkLabel: "已應徵職缺", href: `${url}` },
    { linkLabel: "儲存的職缺", href: `${url}` },
    { linkLabel: "追蹤的企業", href: `${url}` },
  ];

  return (
    <div className="border border-solid border-gray-100">
      <Card>
        <div className="header p-2">Header</div>
        <ul className="list-none p-0">
          <NavigationBarItem
            label={"我的"}
            links={myLinks}
            LabelIcon={PersonOutlineIcon}
          />
          <hr />
          <NavigationBarItem
            label={"求職"}
            links={jobLinks}
            LabelIcon={BusinessCenterIcon}
          />
        </ul>
      </Card>
    </div>
  );
};

const NavigationBarItem = ({
  label,
  links,
  LabelIcon,
}: {
  label: string;
  links: MyLink[];
  LabelIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}) => {
  return (
    <>
      <li className={"text-light flex items-center text-gray-400 text-sm px-2"}>
        <LabelIcon color="disabled" />
        <span className="ml-1">{label}</span>
      </li>
      {links.map((link) => (
        <NavigationBarItemLinks
          key={link.linkLabel}
          link={link}
        ></NavigationBarItemLinks>
      ))}
    </>
  );
};

const NavigationBarItemLinks = ({ link }: { link: MyLink }) => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <li
      key={link.linkLabel}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={`${hovered ? "bg-gray-100" : ""}`}
    >
      <Link className={"block py-2 pl-9"} href={link.href}>
        {link.linkLabel}
      </Link>
    </li>
  );
};

export default NavigationBar;
