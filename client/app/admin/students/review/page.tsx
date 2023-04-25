"use client";

import React from "react";
import { useGetStudentsReview } from "@/hooks/useAdmin";
import StudentRegistCard, { Student } from "../../components/StudentRegistCard";
import Skeleton from "@mui/material/Skeleton";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";

const StudentsReview = (props: any) => {
  const { searchParams } = props;

  const {
    data: { studentDtos: students, total },
  } = useGetStudentsReview(1);

  const renderedStudentRegists = () => {
    if (!students)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (students.length > 0) {
      return students.map((student: Student) => (
        <StudentRegistCard key={student.studentId} student={student} />
      ));
    } else {
      return <div>目前無學生註冊申請</div>;
    }
  };
  return (
    <div className="pb-10">
      <div className="flex flex-col gap-3">{renderedStudentRegists()}</div>

      {students ? (
        students.length > 0 ? (
          <div className="mt-2 flex items-center justify-center">
            <PaginationBar
              count={Math.ceil(total / 10)}
              page={searchParams.page ? parseInt(searchParams.page) : 1}
            />
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default StudentsReview;
