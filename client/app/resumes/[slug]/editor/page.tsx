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
import UnAuthorizedPage from "@/app/components/UnAuthorizedPage";
import { notFound } from "next/navigation";

const ResumePage = ({ params }: { params: any }) => {
  const user = useSelector((state: Store) => state.user);
  const resumeId = params.slug;

  // if (user.role !== "STUDENT") return <UnAuthorizedPage />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: resume, isFetching, isError } = useGetResume(user.id, resumeId);
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
    <div className="flex flex-col gap-2 p-4 md:px-0">
      <UserCard userInfo={userInfo} />
      <RworkHope userId={user.id} resumeId={resumeId} workHope={rworkHope} />
      <RworkExperience
        userId={user.id}
        resumeId={resumeId}
        workExperience={rworkExperience}
      />
      <RprojectAchievements
        userId={user.id}
        resumeId={resumeId}
        projectAchievements={rprojectAchievements}
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
        specialSkills={rspecialSkill}
      />
    </div>
  );
};

export default ResumePage;
