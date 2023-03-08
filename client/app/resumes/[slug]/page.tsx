"use client";

import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useSelector } from "react-redux";
import { Store } from "@/redux/store";
import { useGetResume } from "../../../hooks/Resume/useResume";
import Card from "../../components/Card";
import Image from "next/image";
import Rlicense from "./components/RworkHope";
import RprojectAchievements from "./components/RprojectAchievements";
import Rautobiography from "./components/Rautobiography";
import RspecialSkill from "./components/RspecialSkill";
import RworkExperience from "./components/RworkExperience";
import RworkHope from "./components/RworkHope";

const ResumePage = ({ params }: { params: any }) => {
  const user = useSelector((state: Store) => state.user);
  const resumeId = params.slug;
  const { data: resume, isFetching } = useGetResume(user.id, resumeId);
  const [userInfo, setUserInfo] = useState({
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

  console.log(resume);
  console.log(resumeId);

  
  return <div>ResumePage</div>;
};

export default ResumePage;
