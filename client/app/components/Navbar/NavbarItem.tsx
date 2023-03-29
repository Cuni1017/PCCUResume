import React, { useState } from "react";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
}

const NavbarItem = ({ label, link }: Props) => {
  const [show, setShow] = useState(false);

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
      <Link href={link} className="h-full flex items-center">
        <div className={`${show ? "bg-gray-100" : null} px-2 py-1 relative`}>
          {label}
        </div>
      </Link>
    </div>
  );
};

export default NavbarItem;
