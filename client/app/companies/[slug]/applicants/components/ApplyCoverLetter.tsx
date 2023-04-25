"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { ApplyUser } from "../page";
import { ImageDialog } from "./ApplyActionDialog";

const ApplyCoverLetter = ({
  applyUser,
  children,
}: {
  applyUser: ApplyUser;
  children?: React.ReactNode;
}) => {
  const [isShowHeadshot, setIsShowHeadShot] = useState(false);
  const {
    applyId,
    applyType,
    companyId,
    studentImageUrl,
    applyBeforeTalk,
    createTime,
    resumeId,
    studentEmail,
    studentRealName,
    studentUsername,
    applyEmail,
    applyNumber,
    applyStartTime,
    applyEndTime,
    userId,
    vacanciesId,
  } = applyUser;

  return (
    <div className="flex flex-col gap-5 p-5 min-w-[60vw] sm:min-w-0 max-w-[20rem] sm:max-w-none sm:w-[30rem]">
      {studentImageUrl && (
        <ImageDialog
          imageURL={studentImageUrl}
          isOpen={isShowHeadshot}
          onClose={() => setIsShowHeadShot(false)}
        />
      )}
      <div className="flex gap-2">
        <div onClick={() => setIsShowHeadShot(true)}>
          <Avatar
            className={`${studentImageUrl ? "cursor-pointer" : ""}`}
            alt={studentRealName}
            src={studentImageUrl ? studentImageUrl : " "}
          />
        </div>
        <Link
          href={`/me/${studentRealName}`}
          className="flex items-center hover:underline"
        >
          <div>{studentRealName}</div>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row md:items-center gap-2">
        <div className="font-bold">電子信箱： </div>
        <div className="flex items-center">{applyEmail}</div>
      </div>
      <div className="flex flex-col sm:flex-row md:items-center gap-2">
        <div className="font-bold">聯絡電話： </div>
        <div className="flex items-center">+886 {applyNumber}</div>
      </div>
      {applyType === "實習中" ? (
        <>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="font-bold">實習開始時間：</div>
            <div className="text-sm">
              {applyStartTime ? applyStartTime : "您尚未填寫"}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="font-bold">實習結束時間：</div>
            <div className="text-sm">
              {applyEndTime ? applyEndTime : "您尚未填寫"}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="font-bold">求職信：</div>
          <div className="text-sm indent-8 whitespace-pre-wrap">
            {applyBeforeTalk}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default ApplyCoverLetter;
