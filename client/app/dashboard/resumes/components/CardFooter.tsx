"use client";

import React from "react";
import { Box } from "@mui/material";
import MyButton from "@/app/components/MyButton";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { Resume } from "../page";
import { useDeleteResume } from "../../../../hooks/useResume";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
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
        <MyButton classNames="text-white bg-[#13af69] hover:bg-[#1bd380] focus:bg-[#0e7d4b] focus:border-[#063822]">
          編輯
        </MyButton>
      </Link>
      <Link href={`/resumes/${resume.resumeId}/editor`}>
        <MyButton classNames="hover:bg-gray-200">檢視</MyButton>
      </Link>
      <div className="ml-auto flex gap-2">
        <MyButton
          onClick={() => {
            alert("目前暫無功能");
          }}
          classNames="h-[33px] flex items-center hover:bg-gray-200"
        >
          <SettingsIcon />
        </MyButton>
        <MyButton
          onClick={handleOpen}
          classNames="hover:bg-[#e25454] hover:text-white h-[33px] flex items-center"
        >
          <DeleteForeverIcon />
        </MyButton>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="text-2xl px-2 py-2 border-solid border-0 border-b border-gray-300">
            刪除
          </div>
          <div className="flex gap-2 p-2 justify-between">
            <MyButton
              onClick={() => handleDelete()}
              classNames="bg-[#e25555] hover:bg-[#df6e6e]  text-white h-[33px] flex items-center"
            >
              確認刪除
            </MyButton>
            <MyButton onClick={handleClose} classNames="hover:bg-gray-200">
              取消
            </MyButton>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CardFooter;
