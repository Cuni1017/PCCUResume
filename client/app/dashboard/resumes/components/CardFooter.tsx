"use client";

import React from "react";
import { Box } from "@mui/material";
import MyButton from "@/app/components/MyButton";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Resume } from "../page";
import { useDeleteResume } from "../../../../hooks/Resume/useResume";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  p: "1rem",
  boxShadow: 24,
  borderRadius: "0.25rem",
};

const CardFooter = ({ resume, userId }: { resume: Resume; userId: string }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate } = useDeleteResume();

  const handleDelete = () => {
    handleClose();
    mutate({ userId, resumeId: resume.resumeId });
  };

  return (
    <>
      <Link href={`/resumes/${resume.resumeId}/editor`}>
        <MyButton classnames="text-white bg-[#13af69] hover:bg-[#1bd380] focus:bg-[#0e7d4b] focus:border-[#063822]">
          編輯
        </MyButton>
      </Link>
      <Link href={`/resumes/${resume.resumeId}/editor`}>
        <MyButton classnames="hover:bg-gray-200">檢視</MyButton>
      </Link>
      <div className="ml-auto flex gap-2">
        <MyButton
          onClick={() => {
            alert("目前暫無功能");
          }}
          classnames="h-[33px] flex items-center hover:bg-gray-200"
        >
          <SettingsIcon />
        </MyButton>
        <MyButton
          onClick={handleOpen}
          classnames="hover:bg-[#e25454] hover:text-white h-[33px] flex items-center"
        >
          <DeleteForeverIcon />
        </MyButton>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="bg-white rounded p-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-150%] min-w-[300px] md:w-[400px]">
          <div className="text-center font-bold text-xl px-2 py-2 border-solid border-0 border-b border-gray-300">
            確定刪除 {resume.name}?
          </div>
          <div className="mt-6 grid grid-cols-2 gap-20 p-2 justify-between">
            <MyButton
              onClick={() => handleDelete()}
              classnames="bg-[#e25555] hover:bg-[#df6e6e] text-white h-[33px] flex items-center justify-center"
            >
              確認
            </MyButton>
            <MyButton onClick={handleClose} classnames="hover:bg-gray-200">
              取消
            </MyButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardFooter;
