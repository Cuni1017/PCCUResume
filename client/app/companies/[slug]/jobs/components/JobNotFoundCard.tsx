"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/app/components/Card";
import MyButton from "@/app/components/MyButton";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import { usePathname } from "next/navigation";

const JobNotFoundCard = ({ companyName }: { companyName: string }) => {
  const pathname = usePathname();
  const { name } = useSelector((store: Store) => store.user);

  return (
    <Card classnames="p-5 flex flex-col items-center gap-2">
      <div className="relative w-[5rem] h-[5rem]">
        <Image src={"/error.png"} alt="error" fill sizes="100%" />
      </div>
      <div className="text-slate-500">沒有符合搜尋條件的結果。</div>
      {decodeURI(pathname!.split("/")[2]) === name ? (
        <Link href={`/companies/${companyName}/jobs/new`}>
          <MyButton classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
            新增職缺
          </MyButton>
        </Link>
      ) : null}
    </Card>
  );
};

export default JobNotFoundCard;
