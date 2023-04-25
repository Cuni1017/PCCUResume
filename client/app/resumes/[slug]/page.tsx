import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

import Card from "../../components/Card";
import Image from "next/image";
import Rlicense from "./components/Rlicense";
import RprojectAchievements from "./components/RprojectAchievements";
import Rautobiography from "./components/Rautobiography";
import RspecialSkill from "./components/RspecialSkill";
import RworkExperience from "./components/RworkExperience";
import RworkHope from "./components/RworkHope";
import Rsubjects from "./components/Rsubjects";
import { notFound } from "next/navigation";
import UserCard from "./components/UserCard";
import Rskills from "./components/Rskills";

const fetchResumeById = async (resumeId: string) => {
  const res = await fetch(
    `http://localhost:8080/students/S2023030820/resumes/${resumeId}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RVREVOVCIsImlkIjoiUzIwMjMwMzA4MjAiLCJ1c2VybmFtZSI6ImNvcnkiLCJzdWIiOiJjb3J5IiwiaWF0IjoxNjgwODYzNDM1LCJleHAiOjE2NzkxNjA0Njd9.tKWBTuGFs1GoD2xnM1hxWlXoztjsfbWSKBA5eJQaVc0",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

const userInfo = {
  name: "劉大偉",
  email: "sbliu@gmail.com",
  phone: "912345678",
  headshot:
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  AQ: "中國文化大學", //academic qualifications 學歷
};

const ResumePage = async ({ params }: { params: any }) => {
  const resumeId = params.slug;

  const res = await fetchResumeById(resumeId);
  const resume = res.data;

  const {
    number, //電話號碼
    school, //學校
    userId,
    rworkHope, //期望工作
    rlicense, //證照
    rskills,
    rspecialSkill, //特殊技能
    rprojectAchievements, //專案成就
    rautobiography, //自傳
    rworkExperience, //工作經驗
    rsubject, //在校成績
  } = resume;

  // console.log(resume);
  // console.log(resumeId);

  return (
    <div className="flex flex-col gap-2 p-4 md:px-0 max-w-[800px] mx-auto ">
      <UserCard userInfo={userInfo} />
      <RworkHope
        userId={userId}
        resumeId={resumeId}
        workHope={rworkHope}
        isEditMode={false}
      />
      <RworkExperience
        userId={userId}
        resumeId={resumeId}
        workExperience={rworkExperience}
        isEditMode={false}
      />
      <RprojectAchievements
        userId={userId}
        resumeId={resumeId}
        projectAchievements={rprojectAchievements}
        isEditMode={false}
      />
      <Rskills
        userId={userId}
        resumeId={resumeId}
        skills={rskills}
        isEditMode={false}
      />

      <Rlicense
        userId={userId}
        resumeId={resumeId}
        license={rlicense}
        isEditMode={false}
      />
      <Rsubjects
        userId={userId}
        resumeId={resumeId}
        subjects={rsubject}
        isEditMode={false}
      />
      <Rautobiography
        userId={userId}
        resumeId={resumeId}
        autobiography={rautobiography}
        isEditMode={false}
      />
      <RspecialSkill
        userId={userId}
        resumeId={resumeId}
        specialSkills={rspecialSkill}
        isEditMode={false}
      />
    </div>
  );
};

export default ResumePage;
