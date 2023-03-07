"use client";

import React from "react";
import ResumeCard from "./components/ResumeCard";
import NewResume from "./components/NewResume";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetResumes } from "../../../hooks/useResume";

export interface Resume {
  resumeId: string;
  userId: string;
  name: string;
  number: number;
  school: string;
  createTime: string;
}

const ResumePage = () => {
  const user = useSelector((state: Store) => state.user);
  const { data: resumes, isFetching } = useGetResumes(user.id);
  
  const renderedContent = () => {
    if (isFetching) {
      return "Loading...";
    }
    if (resumes.length > 0) {
      return resumes.map((resume: Resume) => (
        <ResumeCard key={resume.resumeId} resume={resume} userId={user.id} />
      ));
    } else {
      return (
        <div>
          <div className="text-center">
            <div className="text-2xl">製作您的第一份履歷</div>
            <span className="text-sm font-light">請輸入基本資訊</span>
            <NewResume userId={user.id} />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <p>履歷列表</p>
      <div className="flex flex-col gap-3">{renderedContent()}</div>
    </div>
  );
};

export default ResumePage;
