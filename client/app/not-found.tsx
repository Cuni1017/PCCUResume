import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="md:max-w-[860px] lg:max-w-[1140px] m-auto px-5 md:p-0">
      <div className="mt-10 flex flex-col gap-2 items-center">
        <div className="relative w-[10rem] h-[10rem]">
          <Image src={"/error.png"} alt="error" fill sizes="100%" />
        </div>
        <div className="text-2xl text-slate-500">找不到頁面</div>
        <div className="text-sm text-slate-500">我們找不到您想找的頁面。</div>
      </div>
    </div>
  );
};

export default NotFound;
