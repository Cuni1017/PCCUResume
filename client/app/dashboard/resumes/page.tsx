"use client";

import React, { useState } from "react";
import ResumeCard from "./components/ResumeCard";
import NewResume from "./components/NewResume";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetResumes } from "../../../hooks/Resume/useResume";
import Button from "@mui/material/Button";

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
  const [showNewResume, setShowNewResume] = useState(false);

  const renderedContent = () => {
    if (isFetching) {
      return "Loading...";
    }
    if (resumes.length > 0) {
      return (
        <div className="flex flex-col gap-10">
          {resumes.map((resume: Resume) => (
            <ResumeCard
              key={resume.resumeId}
              resume={resume}
              userId={user.id}
            />
          ))}
          {showNewResume ? (
            <div>
              <div className="text-center">
                <div className="text-2xl">製作您的履歷</div>
                <span className="text-sm font-light">請輸入履歷名稱</span>
                <NewResume userId={user.id} />
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-center">
            <div className="text-2xl">製作您的第一份履歷</div>
            <span className="text-sm font-light">請輸入履歷名稱</span>
            <NewResume userId={user.id} />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm">履歷列表</p>
        {resumes.length > 0 ? (
          <Button
            variant="contained"
            color="info"
            className="h-[30px]"
            onClick={() => setShowNewResume(!showNewResume)}
          >
            {showNewResume ? "取消" : "新增"}
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">{renderedContent()}</div>
    </div>
  );
};

export default ResumePage;
