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
import { defaultTokenHeaders } from "@/hooks/shared";

const fetchResumeById = async (resumeId: string) => {
  const res = await fetch(`http://localhost:8080/v1/resumes/${resumeId}`, {
    method: "GET",
    ...defaultTokenHeaders,
    cache: "no-store",
  });

  if (!res.ok) {
    // throw new Error("Failed to fetch");
    notFound();
  }

  return res.json();
};

const ResumePage = async ({ params }: { params: any }) => {
  const resumeId = params.slug;

  const res = await fetchResumeById(resumeId);
  const resume = res.data;

  const {
    name,
    number, //電話號碼
    email, //! 沒給
    imageUrl,
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

  const userInfo = {
    name,
    email,
    phone: number,
    headshot: imageUrl,
    AQ: school, //academic qualifications 學歷
  };

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
