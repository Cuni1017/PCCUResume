"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@/app/components/Card";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "@/app/components/MyButton";
import { DoubleCheckDialog } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import { ImageDialog } from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import IconButton from "@mui/material/IconButton";
import { usePutStudent } from "@/hooks/useAdmin";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

export interface Student {
  studentId: string;
  studentName: string;
  studentUsername: string;
  studentPassword: string;
  studentEmail: string;
  studentNumber: string | null;
  studentImageUrl: string | null;
  studentImageOldName: string | null;
  studentImageNewName: string | null;
  pccuId: string;
  studentCreateTime: string; //YYYY-MM-DD
}

const StudentRegistCard = ({
  student,
  isReviewed,
}: {
  student: Student;
  isReviewed?: boolean;
}) => {
  const [isShowActions, setIsShowActions] = useState(false);
  const [isShowHeadshot, setIsShowHeadShot] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);

  const { mutate, isSuccess, isLoading } = usePutStudent(student.studentId);
  const { id } = useSelector((store: Store) => store.user);

  const {
    pccuId,
    studentName,
    studentUsername,
    studentEmail,
    studentImageUrl,
    studentCreateTime,
  } = student;

  const handleAgree = () => {
    mutate({ teacherId: id, studentId: student.studentId, role: "STUDENT" });
  };

  const handleDelete = () => {
    mutate({ teacherId: id, studentId: student.studentId, role: "DELETE" });
  };

  return (
    <Card
      classnames="p-3 flex flex-col gap-2 hover:bg-gray-200 relative"
      onMouseEnter={() => setIsShowActions(true)}
      onMouseLeave={() => setIsShowActions(false)}
    >
      {studentImageUrl && (
        <ImageDialog
          imageURL={studentImageUrl}
          isOpen={isShowHeadshot}
          onClose={() => setIsShowHeadShot(false)}
        />
      )}
      <DoubleCheckDialog
        title={"確認刪除？"}
        content={"將直接刪除學生帳號。"}
        isOpen={isDeleteModalShow}
        isLoading={isLoading}
        onSure={handleDelete}
        onClose={() => setIsDeleteModalShow(false)}
        type="danger"
      />
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {studentImageUrl ? (
            <IconButton onClick={() => setIsShowHeadShot(true)}>
              <Avatar
                alt={studentName}
                src={studentImageUrl ? studentImageUrl : "/PCCUResume.png"}
              />
            </IconButton>
          ) : (
            <Avatar
              alt={studentName}
              src={studentImageUrl ? studentImageUrl : "/PCCUResume.png"}
            />
          )}
          <div className="text-lg">{studentName}</div>
        </div>
        <div className="text-slate-500 text-sm">
          <Tooltip title="註冊時間">
            <div className="cursor-pointer">{studentCreateTime}</div>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">帳號：</div>
          <div>{studentUsername}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">學號：</div>
          <div>{pccuId}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="font-bold">信箱：</div>
          <div>{studentEmail}</div>
        </div>
      </div>
      <div
        // top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
        className={`bottom-5 right-5 flex flex-col md:flex-row gap-2 ${
          isShowActions ? "absolute" : "hidden"
        }`}
      >
        {isReviewed ? null : (
          <MyButton
            onClick={handleAgree}
            classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700 w-[10rem] h-[40px]"
          >
            同意
          </MyButton>
        )}
        <MyButton
          onClick={() => {
            setIsDeleteModalShow(true);
            setIsShowActions(false);
          }}
          classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 w-[10rem] h-[40px]"
        >
          刪除
        </MyButton>
      </div>
    </Card>
  );
};

export default StudentRegistCard;
