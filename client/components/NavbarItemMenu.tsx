import React, { useState } from "react";
import Link from "next/link";

interface Props {
  label: string;
  links?: { label: string; link: string }[];
}

const NavbarItem = ({ label, links }: Props) => {
  const [show, setShow] = useState(false);

  let renderedList;
  if (links) {
    renderedList = links.map((l) => {
      return (
        <li key={l.label} className="py-2 my-1 hover:bg-gray-100">
          <Link href={l.link}>{l.label}</Link>
        </li>
      );
    });
  }

  return (
    <div
      className="h-full text-sm bg-white z-10 flex items-center cursor-pointer"
      onMouseEnter={(e) => {
        setShow(true);
      }}
      onMouseLeave={(e) => {
        setShow(false);
      }}
    >
      <div className={`${show ? "bg-gray-100" : null} px-2 py-1 relative`}>
        {label}
        {show ? (
          <div className="absolute top-[45px] left-0 border-solid border-gray-100 border">
            <ul className="list-none py-2 px-0 m-0 w-20 text-center bg-white shadow">
              {links && renderedList}
              {/* <li className="py-2 my-1 hover:bg-gray-100">
                <Link href="/tanstack">審核廠商</Link>
              </li>
              <li className="py-2 my-1 hover:bg-gray-100">
                <Link href="/tanstack">審核學生</Link>
              </li> */}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavbarItem;
