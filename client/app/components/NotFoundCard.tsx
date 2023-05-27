import React from "react";
import Image from "next/image";
import Card from "@/app/components/Card";

const NotFoundCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Card classnames="p-5 flex flex-col items-center gap-2">
      <div className="relative w-[5rem] h-[5rem]">
        <Image src={"/error.png"} alt="error" fill sizes="100%" />
      </div>
      <div className="text-slate-500">沒有符合搜尋條件的結果。</div>
      {children}
    </Card>
  );
};

export default NotFoundCard;
