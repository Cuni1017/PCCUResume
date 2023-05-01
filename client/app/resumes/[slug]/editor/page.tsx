"use client";

import React from "react";
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
import Rsubjects from "../components/Rsubjects";
import Rskills from "../components/Rskills";
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";
import { notFound } from "next/navigation";

const ResumePage = ({ params }: { params: any }) => {
  const user = useSelector((state: Store) => state.user);
  const resumeId = params.slug;

  // if (user.role !== "STUDENT") return <UnAuthorizedPage />;
  const { data: resume, isFetching, isError } = useGetResume(user.id, resumeId);
  const {
    number, //電話號碼
    school, //學校
    rworkHope, //期望工作
    rlicense, //證照
    rskills,
    rspecialSkill, //特殊技能
    rprojectAchievements, //專案成就
    rautobiography, //自傳
    rworkExperience, //工作經驗
    rsubject, // 在校成績
  } = resume;

  const userInfo = {
    name: user.name,
    email: user.email,
    phone: number,
    headshot: user.imageURL,
    AQ: school, //academic qualifications 學歷
  };

  if (isError) notFound();
  if (user.id !== resume.userId) return <UnAuthorizedPage />;

  return (
    <div className="flex flex-col gap-2 p-4 md:px-0 max-w-[800px] mx-auto">
      <UserCard userInfo={userInfo} />
      <RworkHope
        userId={user.id}
        resumeId={resumeId}
        workHope={rworkHope}
        isEditMode={true}
      />
      <RworkExperience
        userId={user.id}
        resumeId={resumeId}
        workExperience={rworkExperience}
        isEditMode={true}
      />
      <RprojectAchievements
        userId={user.id}
        resumeId={resumeId}
        projectAchievements={rprojectAchievements}
        isEditMode={true}
      />
      <Rskills
        userId={user.id}
        resumeId={resumeId}
        skills={rskills}
        isEditMode={true}
      />
      <Rlicense
        userId={user.id}
        resumeId={resumeId}
        license={rlicense}
        isEditMode={true}
      />
      <Rsubjects
        userId={user.id}
        resumeId={resumeId}
        subjects={rsubject}
        isEditMode={true}
      />
      <Rautobiography
        userId={user.id}
        resumeId={resumeId}
        autobiography={rautobiography}
        isEditMode={true}
      />
      <RspecialSkill
        userId={user.id}
        resumeId={resumeId}
        specialSkills={rspecialSkill}
        isEditMode={true}
      />
    </div>
  );
};

export default ResumePage;
