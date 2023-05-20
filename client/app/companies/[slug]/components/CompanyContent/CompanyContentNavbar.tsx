"use client";

import React, { useState, useEffect, useRef } from "react";
import { CompanyAbout } from "../../page";
import { Link, animateScroll as scroll } from "react-scroll";
import { getIsFullfillLexicalRegex } from "@/util/getIsFullfillLexicalRegex";

const scrollDutation = 300;

const CompanyContentNavbar = ({
  companyInfo,
}: {
  companyInfo: CompanyAbout;
}) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const [isPastEle, setIsPastEle] = useState(false); //偵測是否超過CompanyContentNavbar了，如是，Position要改成fixed
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const { companyAboutService, companyAboutWelfare, companyAboutBasic } =
    companyInfo;

  // console.log(isPastEle);
  // console.log(eleRef);

  useEffect(() => {
    const detectScreen = (e: any) => {
      // console.log(window.scrollY);
      if (!eleRef.current?.offsetTop) return;

      if (window.scrollY > eleRef.current?.offsetTop) setIsPastEle(true);
      else setIsPastEle(false);
    };
    document.addEventListener("scroll", detectScreen);
    return () => {
      document.removeEventListener("scroll", detectScreen);
    };
  }, []);

  return (
    <div className="flex flex-col text-sm text-slate-500" ref={eleRef}>
      {companyAboutBasic ? (
        <>
          {companyAboutBasic.companyAboutTalk &&
          getIsFullfillLexicalRegex(companyAboutBasic.companyAboutTalk) ? (
            <CompanyContentNavbarItem
              label="公司介紹"
              linkId="companyAboutTalk"
            />
          ) : null}
          {companyAboutBasic.companyAboutEnvironment &&
          getIsFullfillLexicalRegex(
            companyAboutBasic.companyAboutEnvironment
          ) ? (
            <CompanyContentNavbarItem
              label="公司環境"
              linkId="companyAboutEnvironment"
              classnames="order-last"
            />
          ) : null}
        </>
      ) : null}
      {companyAboutService ? (
        <>
          {companyAboutService.companyAboutService &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutService) ? (
            <CompanyContentNavbarItem
              label="產品或服務"
              linkId="companyAboutService"
            />
          ) : null}
          {companyAboutService.companyAboutMission &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutMission) ? (
            <CompanyContentNavbarItem
              label="使命"
              linkId="companyAboutMission"
            />
          ) : null}
          {companyAboutService.companyAboutMedia &&
          getIsFullfillLexicalRegex(companyAboutService.companyAboutMedia) ? (
            <CompanyContentNavbarItem
              label="媒體曝光"
              linkId="companyAboutMedia"
            />
          ) : null}
        </>
      ) : null}

      {companyAboutWelfare ? (
        <>
          {companyAboutWelfare.companyAboutWelfare &&
          getIsFullfillLexicalRegex(companyAboutWelfare.companyAboutWelfare) ? (
            <CompanyContentNavbarItem
              label="員工福利"
              linkId="companyAboutWelfare"
            />
          ) : null}
        </>
      ) : null}

      {/* <div onClick={scrollToTop}>至頂</div> */}
    </div>
  );
};

const CompanyContentNavbarItem = ({
  label,
  linkId,
  classnames,
}: {
  label: string;
  linkId: string;
  classnames?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      activeClass="border-solid border-0 border-l-2 border-blue-500"
      className={`cursor-pointer px-3 py-2 ${
        hovered ? "text-black" : "text-slate-500"
      }
      ${classnames ? classnames : ""}
      `}
      to={linkId}
      spy={true}
      smooth={true}
      duration={scrollDutation}
    >
      {label}
    </Link>
  );
};
export default CompanyContentNavbar;
