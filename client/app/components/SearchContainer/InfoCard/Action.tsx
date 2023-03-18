"use client";

import MyButton from "../../MyButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Tooltip from "@mui/material/Tooltip";

const Action = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex md:w-8/12 gap-3">
        <div className="hidden lg:block w-2/12"></div>
        <div className="flex w-full items-center gap-1 text-sm text-slate-700">
          <Tooltip title="觀看人數">
            <div className="flex items-center gap-1 cursor-pointer">
              <RemoveRedEyeOutlinedIcon />
              100+
            </div>
          </Tooltip>
          <Tooltip title="應徵人數">
            <div className="flex items-center gap-1 cursor-pointer">
              <AssignmentIndOutlinedIcon />
              10+
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex gap-3">
        <MyButton classNames="hover:bg-gray-300 flex items-center text-base">
          <BookmarkBorderOutlinedIcon />
          儲存
        </MyButton>
        <MyButton classNames="bg-blue-400 hover:bg-blue-500 text-white text-base">
          立即應徵
        </MyButton>
      </div>
    </div>
  );
};

export default Action;
