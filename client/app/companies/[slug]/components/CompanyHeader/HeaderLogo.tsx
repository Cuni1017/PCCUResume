"use client";

import { useState } from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { CompanyAbout } from "../../page";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const HeaderLogo = ({ companyInfo }: { companyInfo: CompanyAbout }) => {
  const [hovered, setHovered] = useState(false);

  const { companyImageUrl, companyName, companyAboutBasic } = companyInfo;

  const { name } = useSelector((store: Store) => store.user);

  const handleClick = () => {
    name === companyName ? console.log("更換圖片Modal!") : null;
  };

  return (
    <div className="flex justify-center items-center absolute top-[-32px] md:top-[-52px] md:left-[1.5rem] rounded-sm overflow-hidden">
      <div
        className="relative w-[62px] h-[62px] md:w-[98px] md:h-[98px] border-solid border rounded-sm border-white cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <Image
          src={
            companyAboutBasic?.companyAboutLogoImageUrl
              ? companyAboutBasic.companyAboutLogoImageUrl
              : "/PCCUResume.png"
          }
          alt={`${companyName}'s Logo`}
          fill
          sizes="100%"
        />
        {name === companyName ? (
          <div
            style={{ display: hovered ? "flex" : "none" }}
            className="relative bg-[rgba(14,14,15)] z-20 w-full h-full opacity-50 text-white justify-center items-center"
          >
            <CameraAltOutlinedIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderLogo;
