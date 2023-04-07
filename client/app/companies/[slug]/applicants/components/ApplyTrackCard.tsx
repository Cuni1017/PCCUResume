"use client";

import React, { useState } from "react";
import Card from "@/app/components/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Apply } from "../page";
import Tooltip from "@mui/material/Tooltip";
import AvatarStack from "./AvatarStack";
import MyButton from "@/app/components/MyButton";

interface Props {
  apply: Apply;
}

const ApplyTrackCard = ({ apply }: Props) => {
  const {
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
    applyUserDto,
  } = apply;
  

  return (
    <Card classnames="p-5">
      <div className="flex flex-wrap justify-between mb-3">
        <div className="text-xl font-bold">{vacanciesName}</div>
        <div className="flex items-center">
          <Tooltip title="職缺狀態">
            <div className="cursor-pointer">{vacanciesWatchType}</div>
          </Tooltip>
        </div>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ borderBottom: "solid 1px black" }}
          // backgroundColor: "#ddd"
        >
          <Typography className="font-bold text-base">應徵中</Typography>
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
                    <MyButton classnames="text-white bg-green-500 w-full">
                      同意
                    </MyButton>
                  </div>
                  <div>直接確認學生通過面試，平台將發送邀請學生應徵確認。</div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex justify-center sm:min-w-[5rem]">
                    <MyButton classnames="text-white bg-red-500 w-full">
                      拒絕
                    </MyButton>
                  </div>
                  <div>拒絕該學生。</div>
                </div>
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
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-base">應徵者：</div>
              <AvatarStack users={[]} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{ borderBottom: "solid 1px black" }}
          // backgroundColor: "#ddd"
        >
          <Typography className="font-bold text-base">面試中</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            borderTop: "solid 1px rgb(209 213 219 / var(--tw-bg-opacity))",
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              請在對學生的所有面試後做出處理，您將有幾種選擇：
              <div className="text-sm flex flex-col gap-2 pl-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex justify-center sm:min-w-[5rem]">
                    <MyButton classnames="text-white bg-green-500 w-full">
                      同意
                    </MyButton>
                  </div>
                  <div>確認學生通過面試，平台將發送邀請學生應徵確認。</div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex justify-center sm:min-w-[5rem]">
                    <MyButton classnames="text-white bg-red-500 w-full">
                      拒絕
                    </MyButton>
                  </div>
                  <div>拒絕該學生。</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-base">面試者：</div>
              <AvatarStack users={[]} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className="mt-2 flex justify-between">
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
