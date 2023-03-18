"use client";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import Tooltip from "@mui/material/Tooltip";

const Detail = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 w-full">
        <Tooltip title="需求人數" className="cursor-pointer">
          <PersonOutlineOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">1</div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="工作地點" className="cursor-pointer">
          <LocationOnOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">新北市三重區</div>
      </div>
      <div className="flex gap-3 w-full">
        <Tooltip title="薪資範圍" className="cursor-pointer">
          <LocalAtmOutlinedIcon />
        </Tooltip>
        <div className="flex flex-wrap">70萬 ~ 120萬 TWD / 年</div>
      </div>
    </div>
  );
};

export default Detail;
