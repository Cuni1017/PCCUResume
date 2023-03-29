"use client";

import { useState } from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const HeaderBackground = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    console.log("更換背景圖片Modal!");
  };

  return (
    <div
      className="w-full h-[31vw] md:h-[280px] lg:h-[380px] relative bg-gray-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/PCCUResume.png"
        alt="companyBackgroundImage"
        fill
        sizes="100%"
        className="object-cover"
        priority
      />
      <div
        className="absolute right-2 top-2 gap-2 justify-center items-center rounded-sm py-1 px-2 text-sm z-10 text-white bg-[hsla(165,5%,44%,.7)] hover:bg-[hsla(165,5%,44%,.8)] cursor-pointer"
        onClick={handleClick}
        style={{ display: hovered ? "flex" : "none" }}
      >
        <CameraAltOutlinedIcon />
        上傳圖片
      </div>
    </div>
  );
};

export default HeaderBackground;
