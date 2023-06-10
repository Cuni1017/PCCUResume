"use client";

import React from "react";
import { useGetAppliesReview } from "@/hooks/teacher/useAdmin";
import Skeleton from "@mui/material/Skeleton";
import CompanyRegistCard, { Company } from "../../components/CompanyRegistCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";
import ApplyCard from "../../components/ApplyCard";
import { Apply, ApplyUser } from "@/app/companies/[slug]/applicants/page";

const AppliesReview = (props: any) => {
  const { searchParams } = props;

  const {
    data: { allApplyDtoList1: applies, total },
  } = useGetAppliesReview(1);

  const renderedApplies = () => {
    if (!applies)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (applies.length > 0) {
      return applies.map((apply: Apply) => {
        return apply.applyUserDto.map((student: ApplyUser) => (
          <ApplyCard
            key={apply.fullVacanciesDto.vacancies.vacanciesId}
            student={student}
            vacancy={apply.fullVacanciesDto}
          />
        ));
      });
    } else {
      return <div>近五日無學生應徵行為</div>;
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-3">{renderedApplies()}</div>

      {applies ? (
        applies.length > 0 ? (
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

export default AppliesReview;
