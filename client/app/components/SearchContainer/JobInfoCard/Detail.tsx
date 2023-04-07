"use client";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Vacancy } from ".";
import { getSalaryText } from "@/util/getSalaryText";

const Detail = ({ vacancy }: { vacancy: Vacancy }) => {
  const {
    vacanciesSalaryType,
    vacanciesDownSalary,
    vacanciesTopSalary,
    vacanciesQuantity,
    vacanciesWorkExperience,
    vacanciesEducation,
    county,
    vacanciesDistrict,
    vacanciesAddress,
  } = vacancy;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 w-full">
        <Tooltip title="需求人數" className="cursor-pointer">
          <PersonOutlineOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">{vacanciesQuantity}</div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="工作地點" className="cursor-pointer">
          <LocationOnOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">
          {vacanciesDistrict && vacanciesAddress ? (
            <Tooltip
              title={`${county}${vacanciesDistrict}${vacanciesAddress}`}
              className="cursor-pointer"
            >
              <div>{county}</div>
            </Tooltip>
          ) : (
            <div>{county}</div>
          )}
        </div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="薪資範圍" className="cursor-pointer">
          <LocalAtmOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">
          {getSalaryText({
            type: vacanciesSalaryType,
            max: vacanciesTopSalary,
            min: vacanciesDownSalary,
          })}
        </div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="工作年資" className="cursor-pointer">
          <WorkHistoryOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">{vacanciesWorkExperience}</div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="教育程度" className="cursor-pointer">
          <SchoolOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">{vacanciesEducation}</div>
      </div>
    </div>
  );
};

export default Detail;
