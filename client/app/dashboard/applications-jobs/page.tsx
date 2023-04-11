"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetApplies } from "@/hooks/studentJob/useStudentJob";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import { Company } from "@/app/companies/[slug]/applicants/page";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";
import Card from "@/app/components/Card";
import SkillTag from "@/app/components/SearchContainer/JobInfoCard/SkillTag";
import VacancyDetail from "@/app/components/SearchContainer/JobInfoCard/Detail";
import MyButton from "@/app/components/MyButton";
import {
  ApplyType,
  DoubleCheckDialog,
} from "@/app/companies/[slug]/applicants/components/ApplyActionDialog";
import { Tooltip } from "@mui/material";
import MyDialog from "@/app/components/MyDialog";
import { usePutApply } from "@/hooks/useApplicants";
import CloseIcon from "@mui/icons-material/Close";
import SnackBar from "@/app/components/SnackBar";

const ApplicationsJobs = () => {
  const user = useSelector((store: Store) => store.user);

  const { data: applies, isFetching } = useGetApplies(user.id);
  console.log(applies);

  const renderedApplyCards = applies.map((apply: Apply) => (
    <ApplyCard key={apply.apply[0].applyId} apply={apply} />
  ));

  return (
    <div>
      <p className="text-sm">應徵列表</p>
      <div className="flex flex-col gap-3">{renderedApplyCards}</div>
    </div>
  );
};

interface Apply {
  apply: {
    applyId: string;
    vacanciesId: string;
    userId: string;
    resumeId: string;
    companyId: string;
    createTime: string;
    applyBeforeTalk: string;
    applyNumber: number;
    applyType: ApplyType;
    applyEmail: string;
    applyStartTime: string | null;
    applyEndTime: string | null;
  }[];
  fullVacanciesDto: Company & {
    vacancies: Vacancy;
    skills: string;
    county: string;
  };
}

const ApplyCard = ({ apply }: { apply: Apply }) => {
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [showDoubleCheckDialog, setShowDoubleCheckDialog] = useState<
    null | "接受" | "拒絕"
  >(null);

  const {
    applyType,
    createTime,
    applyStartTime,
    applyEndTime,
    resumeId,
    applyEmail,
    applyNumber,
    applyBeforeTalk,
    applyId,
  } = apply.apply[0];

  const {
    companyEmail,
    companyName,
    companyImageUrl,
    companyNumber,
    skills,
    county,
  } = apply.fullVacanciesDto;

  const {
    vacancies,
    vacancies: {
      vacanciesName,
      vacanciesId,
      vacanciesTime,
      vacanciesDistrict,
      vacanciesAddress,
      vacanciesDownSalary,
      vacanciesTopSalary,
      vacanciesCondition,
      vacanciesDepartment,
    },
  } = apply.fullVacanciesDto;

  const { mutate, isSuccess } = usePutApply(companyName);

  const renderedSkillTags = skills
    .split(",")
    .map((skill) => <SkillTag key={skill} skill={skill} />);

  const handleAcceptApply = (action: "接受" | "拒絕") => {
    mutate({
      applyId,
      applyType: action === "接受" ? "實習中" : "待學生同意中失敗",
    });
    setIsReplyDialogOpen(false);
    setShowDoubleCheckDialog(null);
  };

  return (
    <Card classnames="p-3">
      {isSuccess && <SnackBar information={"成功處理要求"} type="success" />}
      <DoubleCheckDialog
        isOpen={!!showDoubleCheckDialog}
        onSure={() =>
          handleAcceptApply(showDoubleCheckDialog as "接受" | "拒絕")
        }
        onClose={() => setShowDoubleCheckDialog(null)}
        title={showDoubleCheckDialog as string}
        content={
          showDoubleCheckDialog === "接受"
            ? "接受該公司的邀請，在此動作後請與公司討論實習結束時間。"
            : "拒絕該公司的邀請，此動作後無法回復。"
        }
      />
      <MyDialog
        isOpen={isReplyDialogOpen}
        onClose={() => setIsReplyDialogOpen(false)}
      >
        <div className="p-3 w-[400px]">
          <div
            className="absolute top-2 right-2"
            onClick={() => setIsReplyDialogOpen(false)}
          >
            <button className="border-0 bg-inherit hover:bg-gray-300 cursor-pointer p-0 flex items-center justify-center">
              <CloseIcon />
            </button>
          </div>
          <div className="text-center text-xl font-bold">回復公司邀請</div>
          <hr className="w-full" />
          <div className="my-5 text-sm indent-8">
            公司已接受您的應徵，請決定是否接受該實習，當做出處理後將無法回復，請慎重考慮。
          </div>
          <div className="grid grid-cols-2 gap-8">
            <MyButton
              onClick={() => setShowDoubleCheckDialog("接受")}
              classnames="text-white bg-green-500 hover:bg-green-600 focus:bg-green-700"
            >
              接受
            </MyButton>
            <MyButton
              onClick={() => setShowDoubleCheckDialog("拒絕")}
              classnames="text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
            >
              拒絕
            </MyButton>
          </div>
        </div>
      </MyDialog>
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col gap-3 w-full lg:w-[60%]">
            <div className="flex gap-3">
              <Link href={`/companies/${companyName}`}>
                <div className="relative w-[3.5rem] h-[3.5rem]">
                  <Image
                    src={companyImageUrl ? companyImageUrl : "/PCCUResume.png"}
                    alt={`${companyName}'s Logo`}
                    sizes="100%"
                    fill
                  ></Image>
                </div>
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`/companies/${companyName}/jobs/${vacanciesId}`}
                  className="text-xl flex items-center hover:underline"
                >
                  {vacanciesName}
                </Link>
                <Link
                  href={`/companies/${companyName}`}
                  className="hover:underline"
                >
                  {companyName}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <strong>狀態：</strong>
                <ApplyState applyType={applyType} />
              </div>

              {applyType === "實習中" ? (
                <>
                  <div>
                    <strong>開始時間：</strong>
                    {applyStartTime ? applyStartTime : "公司尚未填寫開始時間"}
                  </div>
                  <div>
                    <strong>預計結束時間：</strong>
                    {applyEndTime ? applyEndTime : "公司尚未填寫結束時間"}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>信箱：</strong>
                    {applyEmail}
                  </div>
                  <div>
                    <strong>電話：</strong>
                    +886 {applyNumber}
                  </div>
                  <div>
                    <strong>應徵時間：</strong>
                    {createTime}
                  </div>
                  <div>
                    <strong>面試流程：</strong>
                    {vacanciesCondition}
                  </div>
                </>
              )}
              <div>
                <strong>履歷：</strong>
                <Link href={`/resumes/${resumeId}`}>
                  <MyButton classnames="hover:bg-gray-300">前往觀看</MyButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[30%]">
            <VacancyDetail
              vacancy={{
                ...vacancies,
                county: `${county}`,
              }}
            />
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">{renderedSkillTags}</div>
        {applyType === "待學生同意中" ? (
          <div className="ml-auto">
            <MyButton
              onClick={() => setIsReplyDialogOpen(true)}
              classnames="ml-auto text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            >
              回復公司邀請
            </MyButton>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const ApplyState = ({ applyType }: { applyType: ApplyType }) => {
  const Title =
    applyType === "應徵中"
      ? "等待公司回覆中"
      : applyType === "面試中"
      ? "面試進行中"
      : applyType === "待學生同意中"
      ? "等待您決定是否接受實習邀請"
      : applyType === "實習中"
      ? "實習進行中"
      : "";

  return (
    <Tooltip title={Title}>
      <div className="cursor-pointer">{applyType}</div>
    </Tooltip>
  );
};

export default ApplicationsJobs;
