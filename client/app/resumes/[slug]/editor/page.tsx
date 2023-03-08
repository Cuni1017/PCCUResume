"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import { useGetResume } from "../../../../hooks/Resume/useResume";
import UserCard from "../components/UserCard";
import Rlicense from "../components/Rlicense";
import RprojectAchievements from "../components/RprojectAchievements";
import Rautobiography from "../components/Rautobiography";
import RspecialSkill from "../components/RspecialSkill";
import RworkExperience from "../components/RworkExperience";
import RworkHope from "../components/RworkHope";

const ResumePage = ({ params }: { params: any }) => {
  const user = useSelector((state: Store) => state.user);
  const resumeId = params.slug;
  const { data: resume, isFetching } = useGetResume(user.id, resumeId);
  const [userInfo, setUserInfo] = useState({
    name: "劉大傻",
    email: "sbliu@gmail.com",
    phone: "0912345678",
    headshot:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    AQ: "中國文化大學", //academic qualifications 學歷
  });

  const {
    number, //電話號碼
    school, //學校
    rworkHope, //期望工作
    rlicense, //證照
    rspecialSkill, //特殊技能
    rprojectAchievements, //專案成就
    rautobiography, //自傳
    rworkExperience, //工作經驗
  } = resume;

  // console.log(resume);
  // console.log(resumeId);

  return (
    <div className="flex flex-col gap-2 p-4">
      <UserCard userInfo={userInfo} />
      <RworkHope userId={user.id} resumeId={resumeId} workHope={rworkHope} />
      {/* {
          id: "pr123",
          type: "前端工程師、後端工程師",
          date: "週一、週二、週五",
          resumeId: "R2023030703",
          userId: "C660423810",
        } */}
      <RworkExperience
        userId={user.id}
        resumeId={resumeId}
        workExperience={rworkExperience}
      />
      {/* 
        [
          {
            name: "前端工程師",
            department: "軟體部",
            companyname: "劉大偉有限公司",
            startTime: "2023-01-05T05:50:37",
            endTime: "2023-02-19T02:40:23",
            id: "pr12345",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
        ]
      */}
      <RprojectAchievements
        userId={user.id}
        resumeId={resumeId}
        projectAchievements={rprojectAchievements}
      />
      {/* [
          {
            name: "PCCUResume",
            talk: "幫助學校架設實習平台",
            url: "http://localhost:3000",
            startTime: "2023-01-05T05:50:37",
            endTime: "2023-02-19T02:40:23",
            id: "pr2023030701",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
          {
            name: "Portfolios",
            talk: "自架個人網站",
            url: "http://localhost:8080",
            startTime: "2023-03-05T02:40:23",
            endTime: "2023-03-07T05:50:37",
            id: "pr2023030700",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
        ] */}
      {/* rlicense */}
      <Rlicense userId={user.id} resumeId={resumeId} license={rlicense} />
      {/* [
          {
            name: "Java證照",
            id: "pr2023030700",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
          {
            name: "React證照",
            id: "pr2023030700",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
        ] */}
      <Rautobiography
        userId={user.id}
        resumeId={resumeId}
        autobiography={rautobiography}
      />
      <RspecialSkill
        userId={user.id}
        resumeId={resumeId}
        specialSkills={rspecialSkill}
      />
      {/* [
          {
            name: "玩OW",
            talk: "亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500亞服前500",
            special: "劉大偉不行",
          },
          {
            name: "吃飯",
            talk: "大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍大胃王比賽冠軍",
            special: "林小明不行",
          },
        ] */}
    </div>
  );
};

export default ResumePage;
