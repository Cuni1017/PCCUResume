"use client";

import { useState } from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { CompanyAbout } from "../../page";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const HeaderBackground = ({ companyInfo }: { companyInfo: CompanyAbout }) => {
  const [hovered, setHovered] = useState(false);

  const { companyName, companyAboutBasic } = companyInfo;
  const { name } = useSelector((store: Store) => store.user);

  const handleClick = () => {
    name === companyName ? console.log("更換背景圖片Modal!") : null;
  };

  return (
    <div
      className="w-full h-[31vw] md:h-[280px] lg:h-[380px] relative bg-gray-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={
          companyAboutBasic?.companyAboutBackgroundImageUrl
            ? companyAboutBasic.companyAboutBackgroundImageUrl
            : "/PCCUResume.png"
        }
        alt={`${companyName}'s BackgroundImage`}
        fill
        sizes="100%"
        className="object-cover"
        priority
      />
      {name === companyName ? (
        <div
          className="absolute right-2 top-2 gap-2 justify-center items-center rounded-sm py-1 px-2 text-sm z-10 text-white bg-[hsla(165,5%,44%,.7)] hover:bg-[hsla(165,5%,44%,.8)] cursor-pointer"
          onClick={handleClick}
          style={{ display: hovered ? "flex" : "none" }}
        >
          <CameraAltOutlinedIcon />
          {companyAboutBasic?.companyAboutBackgroundImageUrl
            ? "更改圖片"
            : "上傳圖片"}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderBackground;
