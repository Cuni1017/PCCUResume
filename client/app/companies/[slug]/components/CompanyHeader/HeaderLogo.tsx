"use client";

import { useState } from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const HeaderLogo = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    console.log("更換圖片Modal!");
  };

  return (
    <div className="flex justify-center items-center absolute top-[-32px] md:top-[-52px] md:left-[1.5rem] rounded-sm overflow-hidden">
      <div
        className="relative w-[62px] h-[62px] md:w-[98px] md:h-[98px] border-solid border border-[#e2e6e4] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <Image src="/PCCUResume.png" alt="companyLogo" fill sizes="100%" />
        <div
          style={{ display: hovered ? "flex" : "none" }}
          className="relative bg-[rgba(14,14,15)] z-20 w-full h-full opacity-50 text-white justify-center items-center"
        >
          <CameraAltOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default HeaderLogo;
