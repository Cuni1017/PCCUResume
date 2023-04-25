"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Card from "@/app/components/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Apply, ApplyUser } from "../page";
import Tooltip from "@mui/material/Tooltip";
import AvatarStack from "./AvatarStack";
import MyButton from "@/app/components/MyButton";
import ApplyNumber from "./ApplyNumber";
import Link from "next/link";
import VacancyDetails from "@/app/components/JobInfoCard/Detail";

interface Props {
  apply: Apply;
  setEditApplyUser: Dispatch<SetStateAction<ApplyUser | null>>;
}

const ApplyTrackCard = ({ apply, setEditApplyUser }: Props) => {
  const handleAvatarClick = (user: ApplyUser) => setEditApplyUser(user);

  const {
    fullVacanciesDto: {
      companyCounty,
      vacancies,
      vacancies: {
        applyCount,
        companyId,
        teacherId,
        teacherValidType,
        vacanciesAddress,
        vacanciesCondition,
        vacanciesCreateTime,
        vacanciesDepartment,
        vacanciesDescription,
        vacanciesDistrict,
        vacanciesDownSalary,
        vacanciesEducation,
        vacanciesId,
        vacanciesName,
        vacanciesOther,
        vacanciesQuantity,
        vacanciesRequirement,
        vacanciesSafe,
        vacanciesSalaryType,
        vacanciesTime,
        vacanciesTopSalary,
        vacanciesView,
        vacanciesWatchType,
        vacanciesWorkExperience,
      },
    },
    applyUserDto,
  } = apply;

  let applyingUsers: ApplyUser[] = [],
    interviewingUsers: ApplyUser[] = [],
    awaitingUsers: ApplyUser[] = [],
    interningUsers: ApplyUser[] = [];

  applyUserDto.forEach((applyUser) => {
    if (applyUser.applyType === "應徵中") applyingUsers.push(applyUser);
    else if (applyUser.applyType === "面試中")
      interviewingUsers.push(applyUser);
    else if (applyUser.applyType === "待學生同意中")
      awaitingUsers.push(applyUser);
    else if (applyUser.applyType === "實習中") interningUsers.push(applyUser);
  });

  return (
    <Card classnames="p-5">
      <div className="flex flex-wrap justify-between mb-3">
        <Link
          href={`jobs/${vacanciesId}`}
          className="text-xl font-bold hover:underline"
          target="_blank"
        >
          {vacanciesName}
        </Link>
        <div className="flex items-center">
          <Tooltip title="職缺狀態">
            <div className="cursor-pointer">
              {vacanciesWatchType === "隱藏" ? (
                <div className="border-solid border p-1 rounded text-sm text-[#aaa]">
                  隱藏
                </div>
              ) : null}
              {vacanciesWatchType === "暫停" ? (
                <div className="border-solid border p-1 rounded text-sm text-[#e6bc6b] bg-[hsla(40,71%,66%,.1)]">
                  暫停
                </div>
              ) : null}
              {vacanciesWatchType === "公開" ? (
                <div className="border-solid border p-1 rounded text-sm text-[#6bafe6]">
                  公開
                </div>
              ) : null}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="w-full lg:w-[70%]">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${vacanciesId} 應徵中's panelHeader`}
              id={`${vacanciesId} 應徵中's panelHeader`}
              // style={{ borderBottom: "solid 1px black" }}
              // backgroundColor: "#ddd"
            >
              <div className="font-bold text-base flex justify-between mr-auto">
                應徵中
              </div>
              {applyingUsers.length ? (
                <ApplyNumber applyNumber={applyingUsers.length} />
              ) : null}
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderTop: "solid 1px rgb(209 213 219 / var(--tw-bg-opacity))",
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  當學生透過平台應徵該職缺後，您將有幾種選擇：
                  <div className="text-sm flex flex-col gap-2 pl-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-blue-500 w-full">
                          邀請面試
                        </MyButton>
                      </div>
                      <div>
                        學生將進到面試中的分類，並且平台將自動發送履歷至該學生信箱通知通過審核，在此動作後，請再自行與學生溝通面試時間及流程等詳細資訊。
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-amber-500 w-full">
                          同意
                        </MyButton>
                      </div>
                      <div>
                        直接確認學生通過面試，平台將發送應徵確認給學生。
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-red-500 w-full">
                          拒絕
                        </MyButton>
                      </div>
                      <div>拒絕該學生應徵此職缺。</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base">應徵者：</div>
                  {applyingUsers.length > 0 ? (
                    <AvatarStack
                      users={applyingUsers}
                      onClick={handleAvatarClick}
                    />
                  ) : (
                    <div className="text-sm text-slate-500 text-center">
                      目前尚無應徵者
                    </div>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${vacanciesId} 面試中's panelHeader`}
              id={`${vacanciesId} 面試中's panelHeader`}
            >
              <div className="font-bold text-base flex justify-between mr-auto">
                面試中
              </div>
              {interviewingUsers.length ? (
                <ApplyNumber applyNumber={interviewingUsers.length} />
              ) : null}
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderTop: "solid 1px rgb(209 213 219 / var(--tw-bg-opacity))",
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  請在對學生的所有面試結束後做處理，您將有幾種選擇：
                  <div className="text-sm flex flex-col gap-2 pl-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-amber-500 w-full">
                          同意
                        </MyButton>
                      </div>
                      <div>確認學生通過面試，平台將發送應徵確認給學生。</div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-red-500 w-full">
                          拒絕
                        </MyButton>
                      </div>
                      <div>該學生在面試中被拒。</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base">面試者：</div>
                  {interviewingUsers.length > 0 ? (
                    <AvatarStack
                      users={interviewingUsers}
                      onClick={handleAvatarClick}
                    />
                  ) : (
                    <div className="text-sm text-slate-500 text-center">
                      目前尚無面試者
                    </div>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${vacanciesId} 待學生同意中's panelHeader`}
              id={`${vacanciesId} 待學生同意中's panelHeader`}
            >
              <div className="font-bold text-base flex justify-between mr-auto">
                待學生同意中
              </div>
              {awaitingUsers.length ? (
                <ApplyNumber applyNumber={awaitingUsers.length} />
              ) : null}
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderTop: "solid 1px rgb(209 213 219 / var(--tw-bg-opacity))",
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  平台已寄出郵件通知面試成功者，等待學生至平台確認實習資訊中，可透過寄信或電話來提醒面試成功者。
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base">通過面試者：</div>
                  {awaitingUsers.length > 0 ? (
                    <AvatarStack
                      users={awaitingUsers}
                      onClick={handleAvatarClick}
                    />
                  ) : (
                    <div className="text-sm text-slate-500 text-center">
                      目前尚無通過面試者
                    </div>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${vacanciesId} 實習中's panelHeader`}
              id={`${vacanciesId} 實習中's panelHeader`}
            >
              <div className="font-bold text-base flex justify-between mr-auto">
                實習中
              </div>
              {interningUsers.length ? (
                <ApplyNumber applyNumber={interningUsers.length} />
              ) : null}
            </AccordionSummary>
            <AccordionDetails
              style={{
                borderTop: "solid 1px rgb(209 213 219 / var(--tw-bg-opacity))",
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  對於實習中的學生，您將有幾種選擇：
                  <div className="text-sm flex flex-col gap-2 pl-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-lime-500 w-full">
                          調整時間
                        </MyButton>
                      </div>
                      <div>調整該學生的實習時間。</div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex justify-center sm:min-w-[5rem]">
                        <MyButton classnames="text-white bg-red-500 w-full">
                          中斷實習
                        </MyButton>
                      </div>
                      <div>因某些原因，需中斷該學生實習。</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base">實習者：</div>
                  {interningUsers.length > 0 ? (
                    <AvatarStack
                      users={interningUsers}
                      onClick={handleAvatarClick}
                    />
                  ) : (
                    <div className="text-sm text-slate-500 text-center">
                      目前尚無實習者
                    </div>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="w-full lg:w-[25%]">
          <VacancyDetails
            vacancy={{
              ...vacancies,
              county: `${companyCounty}`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div>
          <Tooltip title="徵求部門">
            <div className="cursor-pointer">{vacanciesDepartment}</div>
          </Tooltip>
        </div>
        <div>
          <div className="text-slate-500 text-sm">
            建立於 {vacanciesCreateTime}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApplyTrackCard;
