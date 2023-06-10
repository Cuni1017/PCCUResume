"use client";

import React, { useMemo, useState, useCallback } from "react";
import Card from "@/app/components/Card";
import MyButton from "@/app/components/MyButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import EditInformationCard from "./EditInformationCard";
import Lexical from "@/app/components/Lexical/App";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import {
  useDeleteInformation,
  usePutInformation,
} from "@/hooks/teacher/useInformation";
import SnackBar from "@/app/components/SnackBar";
import DeleteCheckDialog from "./DeleteCheckDialog";

export interface Teacher {
  teacherId: string;
  teacherUsername: string;
  teacherName: string;
  teacherImageUrl: string | null;
  teacherEmail: string;
  teacherNumber: string | null;
  role: string | null; //?不能為null吧
}

// 公告
export interface Information {
  teacherDto: Teacher;
  teacherFile: {
    teacherFileId: string;
    teacherId: string; //誰上傳的
    teacherFileName: string | null; // 檔案名稱
    teacherFilePath: string | null;
    teacherFileUrl: string | null;
    teacherFileTitle: string; //標題
    teacherFileTalk: string; // 內容 Lexical
    teacherFileType: string; // 類型
    updateTime: string;
    createTime: string;
  };
}

const InformationCard = ({ information }: { information: Information }) => {
  const { role, name, username, id } = useSelector(
    (store: Store) => store.user
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    teacherDto: { teacherName, teacherImageUrl },
    teacherFile: {
      teacherFileId,
      teacherFileTitle,
      teacherFileName,
      teacherFileTalk,
      teacherFileType,
      teacherId,
      teacherFilePath,
      teacherFileUrl,
      updateTime,
    },
  } = information;

  const {
    mutate: InfoPutMutate,
    isSuccess: isInfoPutMutateSuccess,
    isError: isInfoPutMutateError,
  } = usePutInformation();
  const {
    mutate: InfoDeleteMutate,
    isSuccess: isInfoDeleteMutateSuccess,
    isError: isInfoDeleteMutateError,
  } = useDeleteInformation();

  const handleInformationUpload = (formData: {
    teacherFileTitle: string;
    teacherFileTalk: string;
    teacherFileType: string;
  }) => {
    InfoPutMutate({ teacherId: id, fileId: teacherFileId, formData });
  };

  const handleDownload = () => {};

  const handleFileDelete = () => {
    if (!teacherFileId) return;
    InfoDeleteMutate({ teacherId: id, fileId: teacherFileId });
  };

  const renderedLexical = useCallback(() => {
    return <Lexical value={teacherFileTalk} editable={false} />;
  }, [teacherFileTalk]);

  return (
    <>
      {(isInfoPutMutateSuccess || isInfoDeleteMutateSuccess) && (
        <SnackBar information={"成功處理要求！"} type="success" />
      )}
      {(isInfoPutMutateError || isInfoDeleteMutateError) && (
        <SnackBar information={"處理要求失敗！"} type="error" />
      )}

      <DeleteCheckDialog
        title="確定刪除公告嗎？"
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onDelete={handleFileDelete}
      />

      <EditInformationCard
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        information={information}
        onUpload={handleInformationUpload}
      />
      <Card
        classnames={`flex flex-col rounded-none border ${isOpen ? "mb-3" : ""}`}
      >
        <div
          className="cursor-pointer min-h-[2rem] px-4 py-2 flex gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
            <div className="font-bold text-xl text-blue-500">
              {teacherFileTitle}
            </div>
            <div className="flex items-center grow">
              <div className="select-none font-semibold border border-solid rounded p-1 bg-emerald-600 text-white">
                {teacherFileType}
              </div>
              <div className="ml-auto">
                <Tooltip title="公告時間">
                  <div className="select-none cursor-pointer text-slate-500 flex gap-1 justify-center items-center">
                    <CalendarMonthRoundedIcon />
                    {updateTime?.replaceAll("-", "/")}
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </div>

        <motion.div
          className="flex flex-col gap-2 overflow-hidden"
          initial={isOpen ? { height: 0 } : { height: "auto", display: "flex" }}
          animate={isOpen ? { height: "auto" } : { height: 0, display: "none" }}
        >
          <hr className="w-full m-0 p-0" />
          <div className="p-4">
            <div>
              <div className="font-bold select-none">發布內容</div>
              <div className="px-4 py-2">
                {renderedLexical()}
                {/* <Lexical value={teacherFileTalk} editable={false} /> */}
              </div>
            </div>
            {teacherFileUrl && (
              <div>
                <div className="font-bold select-none">附件</div>
                <div className="px-4 py-2">
                  <a
                    className="text-blue-500"
                    href={teacherFileUrl}
                    title={teacherFileName as string}
                    download
                  >
                    {teacherFileName}
                  </a>
                </div>
              </div>
            )}
            <div className="flex justify-end items-center gap-8 text-sm text-slate-500">
              {role.includes("TEACHER") && (
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => setIsDeleting(true)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )}

              {/* <MyButton classnames="hover:bg-gray-300">
              <EditIcon />
            </MyButton> */}
              <div className="flex gap-2 items-center">
                <Avatar
                  src={teacherImageUrl ? teacherImageUrl : "/PCCUResume.png"}
                  alt={teacherName}
                />
                <div>
                  {teacherName} 於 {updateTime} 更新
                </div>
              </div>
            </div>
            {/* <div className="self-end">
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="contained"
            endIcon={<DownloadRoundedIcon />}
            onClick={handleDownload}
          >
            下載附屬檔案
          </Button>
        </div> */}
          </div>
        </motion.div>
      </Card>
    </>
  );
};

export default InformationCard;
