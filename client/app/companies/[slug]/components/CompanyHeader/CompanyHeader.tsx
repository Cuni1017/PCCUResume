"use client";

import { useEffect, useState } from "react";
import HeaderBackground from "./HeaderBackground";
import HeaderLogo from "./HeaderLogo";
import HeaderAction from "./HeaderAction";
import HeaderNavigationBar from "./HeaderNavigationBar";
import { CompanyAbout } from "../../page";
import { useGetCompanyAbout } from "@/hooks/useCompanyAbout";

const CompanyHeader = ({
  companyName,
}: // companyInfo,
{
  companyName: string;
  // companyInfo: CompanyAbout;
}) => {
  const { data: companyInfo } = useGetCompanyAbout({ companyName });
  const [isPastEle, setIsPastEle] = useState(false); //偵測是否超過HeaderNavigationBar了，如是，Position要改成fixed

  useEffect(() => {
    const detectScreen = (e: any) => {
      // console.log(window.scrollY);

      if (window.scrollY > 495) setIsPastEle(true);
      else setIsPastEle(false);
    };
    document.addEventListener("scroll", detectScreen);
    return () => {
      document.removeEventListener("scroll", detectScreen);
    };
  }, []);

  console.log(isPastEle);

  return (
    <div
      className={`w-full rounded-b-md overflow-hidden shadow-md ${
        isPastEle ? "fixed top-0" : "md:max-w-[860px] lg:max-w-[1140px] m-auto"
      }`}
    >
      {isPastEle ? null : <HeaderBackground companyInfo={companyInfo} />}
      <div className="w-full md:h-[84px] bg-white relative">
        <div className="max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto px-3 relative">
          <HeaderLogo companyInfo={companyInfo} />
          <div className="p-0 md:pl-[140px] pt-2 flex flex-col gap-[0.4rem]">
            <div className="text-2xl pl-20 md:p-0">
              {decodeURI(companyName)}
            </div>
            <div className="md:absolute md:right-7 md:top-6 flex gap-2 text-md">
              <HeaderAction
                companyInfo={companyInfo}
                companyName={companyName}
              />
            </div>
            <div className="flex text-sm">
              <HeaderNavigationBar companyName={companyName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
