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
import SaveButton from "./SaveButton";

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
    <div className="flex gap-3 items-center">
      <SaveButton vacancyId={vacanciesId as string} />
      <Link
        href={`/companies/${companyName}/jobs/${vacanciesId}`}
        target="_blank"
        className="h-[40px]"
      >
        <MyButton classnames="h-full bg-blue-400 hover:bg-blue-500 text-white text-sm lg:text-base">
          立即應徵
        </MyButton>
      </Link>
    </div>
  );
};

export default Action;
