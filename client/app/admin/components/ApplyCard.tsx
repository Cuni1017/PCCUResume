"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "@/app/components/MyButton";
import MyDialog from "@/app/components/MyDialog";
import {
  ApplyType,
  ImageDialog,
} from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import {
  ApplyUser,
  FullVacanciesDto,
} from "@/app/companies/[slug]/applicants/page";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Image from "next/image";
import Emailing from "@/public/admin/emailing.png"; // 應徵中
import Interviewing from "@/public/admin/businessman-paper-of-the-application-for-a-job.png"; // 面試中
import Awaiting from "@/public/admin/performance.png"; // 待學生同意中 (appointment
import InternShip from "@/public/admin/id-card.png"; // 實習中 (id-card (1), employee
import ApplyCoverLetter from "@/app/companies/[slug]/applicants/components/ApplyCoverLetter";
import { usePutApplyType } from "@/hooks/useAdmin";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const ApplyCard = ({
  student,
  vacancy,
}: {
  student: ApplyUser;
  vacancy: FullVacanciesDto;
}) => {
  const [isShowChangeApplyTypeDialog, setIsShowChangeApplyTypeDialog] =
    useState(false);
  const [isShowSTDHeadshot, setIsShowSTDHeadShot] = useState(false);
  const [isShowCPNHeadshot, setIsShowCPNHeadShot] = useState(false);
  const [isShowCoverLetter, setIsShowCoverLetter] = useState(false);

  const {
    applyId,
    applyType,
    applyEmail,
    applyNumber,
    studentUsername,
    studentRealName,
    studentImageUrl,
    resumeId,
    createTime,
    applyUpdateTime,
  } = student;

  const {
    companyName,
    companyTitle,
    companyCounty,
    companyDistrict,
    companyAddress,
    companyEmail,
    companyNumber,
    companyImageUrl,
    vacancies: {
      vacanciesId,
      vacanciesName,
      teacherValidType,
      vacanciesQuantity,
    },
  } = vacancy;

  const { mutate, isSuccess, isLoading } = usePutApplyType(companyName);
  const { id } = useSelector((store: Store) => store.user);

  const handleChangeApplyType = (applyType: ApplyType) => {
    mutate({ teacherId: id, applyId, applyType });
    setIsShowChangeApplyTypeDialog(false);
  };

  return (
    <Card classnames="p-3 relative hover:bg-gray-200">
      <ChangeApplyTypeDialog
        onChangeApplyType={handleChangeApplyType}
        isOpen={isShowChangeApplyTypeDialog}
        onClose={() => setIsShowChangeApplyTypeDialog(false)}
      />
      <MyDialog
        isOpen={isShowCoverLetter}
        onClose={() => setIsShowCoverLetter(false)}
      >
        <ApplyCoverLetter applyUser={student} />
      </MyDialog>
      {studentImageUrl && (
        <ImageDialog
          imageURL={studentImageUrl}
          isOpen={isShowSTDHeadshot}
          onClose={() => setIsShowSTDHeadShot(false)}
        />
      )}
      {companyImageUrl && (
        <ImageDialog
          imageURL={companyImageUrl}
          isOpen={isShowCPNHeadshot}
          onClose={() => setIsShowCPNHeadShot(false)}
        />
      )}
      <div className="flex flex-col md:grid grid-cols-8 gap-3 md:gap-0">
        <div className="col-span-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            {studentImageUrl ? (
              <IconButton onClick={() => setIsShowSTDHeadShot(true)}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={studentRealName}
                  src={studentImageUrl ? studentImageUrl : "/PCCUResume.png"}
                />
              </IconButton>
            ) : (
              <Avatar
                sx={{ width: 60, height: 60 }}
                alt={studentRealName}
                src={studentImageUrl ? studentImageUrl : "/PCCUResume.png"}
              />
            )}
            <div className="text-lg">{studentRealName}</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="電話">
                <div className="cursor-pointer">
                  <LocalPhoneOutlinedIcon />
                </div>
              </Tooltip>
              <div>0{applyNumber}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="信箱">
                <div className="cursor-pointer">
                  <EmailOutlinedIcon />
                </div>
              </Tooltip>
              <div>{applyEmail}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="應徵時間">
                <div className="cursor-pointer">
                  <AccessTimeOutlinedIcon />
                </div>
              </Tooltip>
              <div>{createTime}</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link
              href={`/resumes/${resumeId}`}
              target="_blank"
              className="hover:bg-gray-300 text-sm p-2 text-center"
            >
              履歷
            </Link>

            <MyButton
              classnames="bg-inherit hover:bg-gray-300"
              onClick={() => setIsShowCoverLetter(true)}
            >
              求職信
            </MyButton>
          </div>
        </div>
        <hr className="w-full m-0 md:hidden" />
        <div className="col-span-2 flex flex-col items-center justify-center">
          <div className="font-bold text-2xl">{applyType}</div>
          <MyButton
            classnames="bg-inherit hover:bg-gray-300"
            onClick={() => setIsShowChangeApplyTypeDialog(true)}
          >
            {applyType === "應徵中" ? (
              <div className="relative w-[5rem] h-[5rem]">
                <Image src={Emailing} alt="應徵中" sizes="100%" fill />
              </div>
            ) : applyType === "面試中" ? (
              <div className="relative w-[5rem] h-[5rem]">
                <Image src={Interviewing} alt="面試中" sizes="100%" fill />
              </div>
            ) : applyType === "待學生同意中" ? (
              <div className="relative w-[5rem] h-[5rem]">
                <Image src={Awaiting} alt="待學生同意中" sizes="100%" fill />
              </div>
            ) : applyType === "實習中" ? (
              <div className="relative w-[5rem] h-[5rem]">
                <Image src={InternShip} alt="實習中" sizes="100%" fill />
              </div>
            ) : null}
          </MyButton>
        </div>
        <hr className="w-full m-0 md:hidden" />
        <div className="col-span-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            {companyImageUrl ? (
              <IconButton onClick={() => setIsShowCPNHeadShot(true)}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={companyName}
                  src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
                />
              </IconButton>
            ) : (
              <Avatar
                sx={{ width: 60, height: 60 }}
                className="p-2"
                alt={companyName}
                src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
              />
            )}
            <div className="flex flex-col">
              <div></div>
              <Link
                href={`/companies/${companyName}/jobs/${vacanciesId}`}
                target="_blank"
                className="text-lg hover:underline"
              >
                {vacanciesName}
              </Link>
              <Link
                href={`/companies/${companyName}`}
                target="_blank"
                className="hover:underline"
              >
                {companyName}
              </Link>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="電話">
                <div className="cursor-pointer">
                  <LocalPhoneOutlinedIcon />
                </div>
              </Tooltip>
              <div>0{companyNumber}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="信箱">
                <div className="cursor-pointer">
                  <EmailOutlinedIcon />
                </div>
              </Tooltip>
              <div>{companyEmail}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip title="公司地點">
                <div className="cursor-pointer">
                  <LocationOnOutlinedIcon />
                </div>
              </Tooltip>
              <div>
                {companyCounty}
                {companyDistrict}
                {companyAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-2 bottom-2">
        <Tooltip title="最後更新時間">
          <div className="cursor-pointer text-sm text-slate-500">
            {applyUpdateTime}
          </div>
        </Tooltip>
      </div>
    </Card>
  );
};

export default ApplyCard;

const ChangeApplyTypeDialog = ({
  onChangeApplyType,
  isOpen,
  onClose,
}: {
  onChangeApplyType: (applyType: ApplyType) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [showDoubleCheckModal, setShowDoubleCheckModal] =
    useState<null | ApplyType>(null);

  return (
    <MyDialog isOpen={isOpen} onClose={onClose}>
      <MyDialog
        isOpen={!!showDoubleCheckModal}
        onClose={() => setShowDoubleCheckModal(null)}
      >
        <div className="p-5 md:h-[10rem] flex flex-wrap md:flex-nowrap gap-10">
          <div className="flex flex-col gap-2 w-full md:w-[20rem]">
            <div className="text-center font-bold text-lg">
              {showDoubleCheckModal}
            </div>
            <hr className="w-full m-0" />
            <div className="text-sm indent-8 my-3">
              將該學生狀態變為{showDoubleCheckModal}。
            </div>
            <div className="mt-auto">
              <MyButton
                onClick={() => {
                  onChangeApplyType(showDoubleCheckModal as ApplyType);
                  setShowDoubleCheckModal(null);
                }}
                classnames="w-full text-white bg-green-500 hover:bg-green-600 focus:bg-green-700"
              >
                確認
              </MyButton>
            </div>
          </div>
          <div className="border-solid border border-gray-300 h-full w-full md:w-0"></div>
          <div className="flex flex-col gap-2 w-full md:w-[20rem]">
            <div className="text-center font-bold text-lg">
              {showDoubleCheckModal}失敗
            </div>
            <hr className="w-full m-0" />
            <div className="text-sm indent-8 my-3">
              將該學生應徵狀態變為{showDoubleCheckModal}失敗。
            </div>
            <div className="mt-auto">
              <MyButton
                onClick={() => {
                  if (showDoubleCheckModal === "應徵中")
                    onChangeApplyType("應徵失敗");
                  else if (showDoubleCheckModal === "面試中")
                    onChangeApplyType("面試失敗");
                  else if (showDoubleCheckModal === "待學生同意中")
                    onChangeApplyType("待學生同意中失敗");
                  else if (showDoubleCheckModal === "實習中")
                    onChangeApplyType("廠商中斷實習");
                  setShowDoubleCheckModal(null);
                }}
                classnames="w-full text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
              >
                確認
              </MyButton>
            </div>
          </div>
        </div>
      </MyDialog>
      <div className="p-5 flex flex-col gap-5 relative">
        <div className="font-bold text-2xl text-center">變更應徵狀態</div>
        <div className="absolute top-2 right-2">
          <MyButton
            onClick={onClose}
            classnames="bg-inherit hover:bg-gray-300 max-w-[2rem] max-h-[2rem] flex items-center justify-center"
          >
            <CloseIcon fontSize="small" />
          </MyButton>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-5">
          <Tooltip title="應徵中" arrow>
            <div>
              <MyButton
                onClick={() => setShowDoubleCheckModal("應徵中")}
                classnames="hover:bg-gray-300"
              >
                <div className="relative w-[5rem] h-[5rem]">
                  <Image src={Emailing} alt="應徵中" sizes="100%" fill />
                </div>
              </MyButton>
            </div>
          </Tooltip>

          <Tooltip title="面試中" arrow>
            <div>
              <MyButton
                classnames="hover:bg-gray-300"
                onClick={() => setShowDoubleCheckModal("面試中")}
              >
                <div className="relative w-[5rem] h-[5rem]">
                  <Image src={Interviewing} alt="應徵中" sizes="100%" fill />
                </div>
              </MyButton>
            </div>
          </Tooltip>

          <Tooltip title="待學生同意中" arrow>
            <div>
              <MyButton
                classnames="hover:bg-gray-300"
                onClick={() => setShowDoubleCheckModal("待學生同意中")}
              >
                <div className="relative w-[5rem] h-[5rem]">
                  <Image src={Awaiting} alt="應徵中" sizes="100%" fill />
                </div>
              </MyButton>
            </div>
          </Tooltip>

          <Tooltip title="實習中" arrow>
            <div>
              <MyButton
                classnames="hover:bg-gray-300"
                onClick={() => setShowDoubleCheckModal("實習中")}
              >
                <div className="relative w-[5rem] h-[5rem]">
                  <Image src={InternShip} alt="應徵中" sizes="100%" fill />
                </div>
              </MyButton>
            </div>
          </Tooltip>
        </div>
      </div>
    </MyDialog>
  );
};
