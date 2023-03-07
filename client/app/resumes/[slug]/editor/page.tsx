"use client";

import React, { ChangeEvent, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import { useGetResume } from "../../../../hooks/useResume";
import Card from "../../../components/Card";
import Image from "next/image";
import Rlicense from "../components/Rlicense";
import RprojectAchievements from "../components/RprojectAchievements";
import Rautobiography from "../components/Rautobiography";
import RspecialSkill from "../components/RspecialSkill";
import RworkExperience from "../components/RworkExperience";
import RworkHope from "../components/RworkHope";
import TextFiled from "../components/TextFiled";

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
    <div className="flex flex-col gap-2 mt-4 px-4">
      <Card>
        <div className="py-3">
          <div className="flex flex-col justify-center items-center mb-5">
            <div className="rounded-full overflow-hidden w-[70px] h-[70px] cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                width={70}
                height={70}
                alt="cat"
                priority
              ></Image>
            </div>
            <div className="text-xl mt-1">{userInfo.name}</div>
          </div>
          <div className="px-4 flex flex-col items-center justify-center gap-3">
            <TextFiled
              label="信箱："
              name="email"
              value={userInfo.email}
              disabled
            />
            <TextFiled
              label="手機："
              name="email"
              value={userInfo.phone}
              disabled
            />
            <TextFiled
              label="學校："
              name="email"
              value={userInfo.AQ}
              disabled
            />
          </div>
        </div>
      </Card>
      <RworkHope userId={user.id} resumeId={resumeId} workHope={rworkHope} />
      <RworkExperience
        userId={user.id}
        resumeId={resumeId}
        workExperience={rworkExperience}
      />
      <RprojectAchievements
        userId={user.id}
        resumeId={resumeId}
        projectAchievements={[
          {
            name: "PCCUResume",
            talk: "幫助學校架設實習平台",
            url: "http://localhost:3000",
            startTime: "2023-02-18",
            endTime: "2023-02-19",
            id: "pr2023030701",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
          {
            name: "Portfolios",
            talk: "個人介紹網站",
            url: "http://localhost:8080",
            startTime: "2023-03-06",
            endTime: "2023-03-07",
            id: "pr2023030700",
            resumeId: "R2023030703",
            userId: "C660423810",
          },
        ]} //rprojectAchievements
      />
      <Rlicense userId={user.id} resumeId={resumeId} license={rlicense} />
      <Rautobiography
        userId={user.id}
        resumeId={resumeId}
        autobiography={rautobiography}
      />
      <RspecialSkill
        userId={user.id}
        resumeId={resumeId}
        speicalSkill={rspecialSkill}
      />
    </div>
  );
};

export default ResumePage;
