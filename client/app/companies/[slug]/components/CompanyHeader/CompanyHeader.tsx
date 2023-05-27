"use client";

import { useEffect, useState, useRef } from "react";
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
  const { data: companyInfo } = useGetCompanyAbout({
    companyName: decodeURI(companyName),
  });
  const eleRef = useRef<HTMLDivElement>(null);
  const [isPastEle, setIsPastEle] = useState(false); //偵測是否超過HeaderNavigationBar了，如是，Position要改成fixed

  useEffect(() => {
    if (!eleRef.current) return;
    const target = eleRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        entry.isIntersecting ? setIsPastEle(false) : setIsPastEle(true);
      },
      {
        threshold: 0.9,
      }
    );
    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <>
      {isPastEle ? (
        <div
          className={`box-border w-full overflow-hidden shadow-md bg-white fixed top-0 z-10`}
        >
          <div className="box-border w-full md:h-[84px] bg-white relative md:max-w-[860px] lg:max-w-[1140px] m-auto">
            <div
              className={`max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto relative`}
            >
              <HeaderLogo companyInfo={companyInfo} isPastEle={isPastEle} />
              <div
                className={`p-0 px-3 sm:px-0 pt-2 flex flex-col gap-[0.4rem]`}
              >
                <div className={`text-2xl pl-[80px] text-[1.25rem] sm:text-md`}>
                  {decodeURI(companyName)}
                </div>

                <div
                  className={`md:absolute md:right-7 md:top-6 flex gap-2 text-md pl-[80px]`}
                >
                  <HeaderAction
                    companyInfo={companyInfo}
                    companyName={companyName}
                  />
                </div>
                <div ref={eleRef} className={`flex text-sm md:pl-[80px]`}>
                  <HeaderNavigationBar companyName={companyName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`box-border w-full overflow-hidden shadow-md bg-white rounded-b-md md:max-w-[860px] lg:max-w-[1140px] m-auto`}
      >
        <HeaderBackground companyInfo={companyInfo} />
        <div className="box-border w-full md:h-[84px] bg-white relative md:max-w-[860px] lg:max-w-[1140px] m-auto">
          <div
            className={`max-w-[24rem] sm:max-w-[36rem] md:max-w-none m-auto relative px-3`}
          >
            <HeaderLogo companyInfo={companyInfo} isPastEle={isPastEle} />
            <div
              className={`p-0 md:pl-[140px] pt-2 flex flex-col gap-[0.4rem]`}
            >
              <div className={`text-2xl pl-20 md:p-0`}>
                {decodeURI(companyName)}
              </div>

              <div
                className={`md:absolute md:right-7 md:top-6 flex gap-2 text-md`}
              >
                <HeaderAction
                  companyInfo={companyInfo}
                  companyName={companyName}
                />
              </div>
              <div ref={eleRef} className={`flex text-sm`}>
                <HeaderNavigationBar companyName={companyName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyHeader;
