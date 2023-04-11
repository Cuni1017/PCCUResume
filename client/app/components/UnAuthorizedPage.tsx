import React from "react";
import Image from "next/image";
import Link from "next/link";
import Shield from "@/public/shield1.png";
import JobSeeker from "@/public/job-seeker.png";
import TalentSeeker from "@/public/vacancy.png";
import Setting from "@/public/settings.png";
import Info from "@/public/newspaper-folded.png";
import MyButton from "@/app/components/MyFakeButton";

const UnAuthorizedPage = () => {
  return (
    <div className="p-[4rem] flex flex-col gap-2 items-center justify-center">
      <div className="relative w-[5rem] h-[5rem]">
        <Image src={Shield} sizes="100%" fill alt="UnAuthorizedLogo" priority />
      </div>
      <div className="text-2xl">您需要權限</div>
      <div className="mt-10 flex flex-col gap-8">
        <div className="text-sm text-slate-500 text-center">
          更多求職和招募資源
        </div>
        <div className="grid grid-cols-2 sm:flex gap-12 sm:gap-16">
          <Link href={"/jobs"}>
            <MyButton classnames="w-[3.5rem] hover:bg-gray-300 flex flex-col items-center gap-2">
              <div className="relative w-[2rem] h-[2rem]">
                <Image src={JobSeeker} alt="JobSeeker" fill sizes="100%" />
              </div>
              <div className="text-sm">搜尋職缺</div>
            </MyButton>
          </Link>

          <Link href={"/search"}>
            <MyButton classnames="w-[3.5rem] hover:bg-gray-300 flex flex-col items-center gap-2">
              <div className="relative w-[2rem] h-[2rem]">
                <Image
                  src={TalentSeeker}
                  alt="TalentSeeker"
                  fill
                  sizes="100%"
                />
              </div>
              <div className="text-sm">搜尋人才</div>
            </MyButton>
          </Link>

          <Link href={"/dashboard"}>
            <MyButton classnames="w-[3.5rem] hover:bg-gray-300 flex flex-col items-center gap-2">
              <div className="relative w-[2rem] h-[2rem]">
                <Image src={Setting} alt="JobSeeker" fill sizes="100%" />
              </div>
              <div className="text-sm">主控台</div>
            </MyButton>
          </Link>

          <Link href={"/information"}>
            <MyButton classnames="w-[3.5rem] hover:bg-gray-300 flex flex-col items-center gap-2">
              <div className="relative w-[2rem] h-[2rem]">
                <Image src={Info} alt="JobSeeker" fill sizes="100%" />
              </div>
              <div className="text-sm">實習資訊</div>
            </MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
