"use client";

import { useState } from "react";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Vacancy } from ".";
import MyModal from "../../MyModal";
import MyButton from "../../MyButton";

const CompanyAction = ({ vacancy }: { vacancy: Vacancy }) => {
  const { companyName, vacanciesId } = vacancy;

  const [isOpen, setIsOpen] = useState(false); //DeleteCheckModal
  const vacancieState: "open" | "pause" | "hidden" = "open";

  const handleVisible = () => {};
  const handleToggleState = () => {};
  const handleDelete = () => {
    console.log("Sure Delete!");
  };

  return (
    <div className="bg-gray-100 px-5 py-2 flex justify-between">
      <div></div>
      <div className="flex gap-1">
        {vacancieState === "hidden" ? (
          <div className="border-solid border p-1 rounded text-sm text-[#aaa]">
            隱藏
          </div>
        ) : null}

        {vacancieState === "pause" ? (
          <div className="border-solid border p-1 rounded text-sm text-[#e6bc6b] bg-[hsla(40,71%,66%,.1)]">
            暫停
          </div>
        ) : null}

        <Link href={`/companies/${companyName}/jobs/${vacanciesId}/edit`}>
          <Tooltip title="編輯">
            <div className="flex items-center gap-1 cursor-pointer">
              <EditOutlinedIcon />
            </div>
          </Tooltip>
        </Link>
        <Link
          href={`/companies/${companyName}/jobs/${vacanciesId}/copy`}
          target="_blank"
        >
          <Tooltip title="複製">
            <div className="flex items-center gap-1 cursor-pointer">
              <ContentCopyOutlinedIcon />
            </div>
          </Tooltip>
        </Link>

        {vacancieState === "hidden" ? (
          <Tooltip title="取消隱藏">
            <div className="flex items-center gap-1 cursor-pointer">
              <VisibilityOutlinedIcon />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="隱藏（無法搜尋到，但有連結者仍可應徵）">
            <div className="flex items-center gap-1 cursor-pointer">
              <VisibilityOffOutlinedIcon />
            </div>
          </Tooltip>
        )}

        {vacancieState === "open" || vacancieState === "hidden" ? (
          <Tooltip title="暫停">
            <div className="flex items-center gap-1 cursor-pointer">
              <PauseIcon />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="開放">
            <div className="flex items-center gap-1 cursor-pointer">
              <PlayArrowOutlinedIcon />
            </div>
          </Tooltip>
        )}

        <Tooltip title="刪除" onClick={() => setIsOpen(true)}>
          <div className="flex items-center gap-1 cursor-pointer">
            <DeleteOutlineOutlinedIcon />
          </div>
        </Tooltip>

        <MyModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="text-red">
                <ReportProblemIcon />
              </div>
              <div className="text-xl">您確定嗎？</div>
            </div>
            <div>
              職缺刪除後將無法復原（不過您仍然可以查看過去的應徵紀錄）。
            </div>
            <div className="self-end flex gap-2">
              <MyButton
                classnames="bg-inherit hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                取消
              </MyButton>
              <MyButton
                classnames="text-white bg-red-500 hover:bg-red-400"
                onClick={handleDelete}
              >
                確定
              </MyButton>
            </div>
          </div>
        </MyModal>
      </div>
    </div>
  );
};

export default CompanyAction;
