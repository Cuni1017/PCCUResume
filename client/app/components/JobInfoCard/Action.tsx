"use client";

import MyButton from "../MyButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Vacancy } from ".";
import Link from "next/link";
import { getDayDiff } from "@/util/getDaydiff";

const Action = ({ vacancy }: { vacancy: Vacancy }) => {
  const {
    companyName,
    vacanciesView,
    vacanciesId,
    applyCount,
    vacanciesUpdateTime,
  } = vacancy;

  const renderedDayDiff = () => {
    if (!vacanciesUpdateTime) return null;

    const dayDiff = Math.floor(
      getDayDiff(new Date(vacanciesUpdateTime), new Date())
    );
    return (
      <Tooltip title="更新時間">
        <div className="flex items-center gap-1 cursor-pointer">
          <AccessTimeIcon fontSize="small" />
          {dayDiff === 0 ? "今日更新" : `${dayDiff} 天前更新`}
        </div>
      </Tooltip>
    );
  };

  // 更新時間
  const dayDiff = vacanciesUpdateTime
    ? Math.floor(getDayDiff(new Date(vacanciesUpdateTime), new Date())) +
      " 天前更新"
    : "";

  return (
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
