"use client";

import React, { useEffect, useState } from "react";
import { useGetStudentsReview } from "@/hooks/teacher/useAdmin";
import StudentRegistCard, { Student } from "../../components/StudentRegistCard";
import Skeleton from "@mui/material/Skeleton";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";
import { useRouter } from "next/navigation";
import NotFoundCard from "../../../components/NotFoundCard";

const StudentsReview = (props: any) => {
  const router = useRouter();
  const [isInit, setIsInit] = useState(true);
  const {
    searchParams: { page, q },
  } = props;

  const {
    data: { studentDtos: students, total },
  } = useGetStudentsReview({
    page: page ? page : 1,
    searchTerm: q ? q : null,
    isReviewed: false,
  });

  useEffect(() => {
    isInit ? setIsInit(false) : router.refresh();
  }, [isInit, page, q, router]);

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
      if (q) return <NotFoundCard />;
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
              page={page ? parseInt(page) : 1}
            />
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default StudentsReview;
