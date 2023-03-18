"use client";

import Link from "next/link";
import Card from "../../components/Card";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { usePathname } from "next/navigation";
import { useState } from "react";

const url = "/dashboard";

interface MyLink {
  linkLabel: string;
  href: string;
}

const NavigationBar = () => {
  const myLinks: MyLink[] = [
    { linkLabel: "個人檔案", href: `${url}` },
    { linkLabel: "履歷", href: `${url}/resumes` },
    { linkLabel: "作品集", href: `${url}/portfolios` },
  ];

  const jobLinks: MyLink[] = [
    { linkLabel: "已應徵職缺", href: `${url}/applications-jobs` },
    { linkLabel: "儲存的職缺", href: `${url}/favorite-jobs` },
    { linkLabel: "追蹤的企業", href: `${url}/following-companies` },
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
  const pathname = usePathname();

  return (
    <li
      key={link.linkLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${hovered ? "bg-gray-100" : ""}
      ${
        pathname === link.href
          ? "border-solid border-0 border-l border-blue-400"
          : ""
      }
      `}
    >
      <Link className={"block py-2 pl-9"} href={link.href}>
        {link.linkLabel}
      </Link>
    </li>
  );
};

export default NavigationBar;
