"use client";

import React from "react";
import Link from "next/link";
import MyButton from "../../../../components/MyButton";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const HeaderAction = ({ companyName }: { companyName: string }) => {
  const { name } = useSelector((store: Store) => store.user);

  return (
    <>
      <button className="h-[2.2rem] bg-white border-solid border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white cursor-pointer rounded px-3">
        追蹤
      </button>
      {name === decodeURI(companyName) ? (
        <Link href={`/companies/${companyName}/jobs/new`}>
          <MyButton classnames="bg-blue-500 hover:bg-blue-400 text-white flex justify-center items-center gap-1 h-[2.2rem]">
            <AddIcon />
            新增職缺
          </MyButton>
        </Link>
      ) : null}
    </>
  );
};

export default HeaderAction;
