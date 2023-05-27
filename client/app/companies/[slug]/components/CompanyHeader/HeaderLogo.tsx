"use client";

import { useState } from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { CompanyAbout } from "../../page";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import ImageUploader from "@/app/components/ImageUploader";
import { usePostCompanyImage } from "@/hooks/useCompanyAbout";

const HeaderLogo = ({
  companyInfo,
  isPastEle,
}: {
  companyInfo: CompanyAbout;
  isPastEle: boolean; //判斷是否為fixedMode，如果超過 "關於、職缺、應徵者"的那行導覽列的話為true
}) => {
  const [hovered, setHovered] = useState(false);
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);

  const { companyName, companyAboutBasic } = companyInfo;

  const { name } = useSelector((store: Store) => store.user);
  const { mutate } = usePostCompanyImage({ companyName });

  const handleClick = () => {
    name === companyName ? setIsImageUploaderOpen(true) : null;
  };

  const handleImageUpload = (formData: FormData) => {
    mutate({ companyName, formData, type: "logo" });
    setIsImageUploaderOpen(false);
  };

  return (
    <>
      {isImageUploaderOpen && (
        <ImageUploader
          onUpload={handleImageUpload}
          isOpen={isImageUploaderOpen}
          onClose={() => setIsImageUploaderOpen(false)}
        />
      )}

      <div
        className={`flex justify-center items-center absolute ${
          isPastEle
            ? "top-[12px] left-[10px] sm:left-0"
            : "top-[-32px] md:top-[-52px] md:left-[1.5rem]"
        } rounded-sm overflow-hidden`}
      >
        <div
          className={`relative ${
            isPastEle
              ? "w-[62px] h-[62px]"
              : "w-[62px] h-[62px] md:w-[98px] md:h-[98px]"
          } flex items-center justify-center border-solid border rounded-sm border-white cursor-pointer`}
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
    </>
  );
};

export default HeaderLogo;
