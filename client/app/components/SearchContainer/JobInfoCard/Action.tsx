"use client";

import MyButton from "../../MyButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Vacancy } from ".";
import Link from "next/link";

const Action = ({ vacancy }: { vacancy: Vacancy }) => {
  const { companyName, vacanciesView, vacanciesId, applyCount } = vacancy;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex md:w-8/12 gap-3">
        <div className="hidden lg:block w-2/12"></div>
        <div className="flex w-full items-center gap-1 text-sm text-slate-700">
          <Tooltip title="觀看人數">
            <div className="flex items-center gap-1 cursor-pointer">
              <RemoveRedEyeOutlinedIcon />
              {vacanciesView >= 20
                ? `${Math.floor(vacanciesView / 10) * 10}+`
                : "10+"}
            </div>
          </Tooltip>
          <Tooltip title="應徵人數">
            <div className="flex items-center gap-1 cursor-pointer">
              <AssignmentIndOutlinedIcon />
              {applyCount}+
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex gap-3">
        <SaveButton />
        <Link
          href={`/companies/${companyName}/jobs/${vacanciesId}`}
          target="_blank"
        >
          <MyButton classnames="bg-blue-400 hover:bg-blue-500 text-white text-base">
            立即應徵
          </MyButton>
        </Link>
      </div>
    </div>
  );
};

export default Action;

export const SaveButton = (props: any) => {
  return (
    <MyButton
      classnames="hover:bg-gray-300 flex items-center text-sm md:text-base justify-center gap-1"
      {...props}
    >
      <BookmarkBorderOutlinedIcon />
      儲存
    </MyButton>
  );
};
