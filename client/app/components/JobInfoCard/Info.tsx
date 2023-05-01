"use client";

import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Vacancy } from ".";
import { getDayDiff } from "@/util/getDaydiff";

const VacancyInfo = ({ vacancy }: { vacancy: Vacancy }) => {
  const { vacanciesView, applyCount, vacanciesUpdateTime } = vacancy;

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

  return (
    <>
      {renderedDayDiff()}
      <Tooltip title="觀看人數">
        <div className="flex items-center gap-1 cursor-pointer">
          <RemoveRedEyeOutlinedIcon fontSize="small" />
          {vacanciesView >= 20
            ? `${Math.floor(vacanciesView / 10) * 10}+`
            : "10+"}
        </div>
      </Tooltip>
      <Tooltip title="應徵人數">
        <div className="flex items-center gap-1 cursor-pointer">
          <AssignmentIndOutlinedIcon fontSize="small" />
          {applyCount}+
        </div>
      </Tooltip>
    </>
  );
};

export default VacancyInfo;
