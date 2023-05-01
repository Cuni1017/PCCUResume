"use client";

import React from "react";
import { useGetVacanciesReview } from "@/hooks/useAdmin";
import Skeleton from "@mui/material/Skeleton";
import VacancyRegistCard from "../../components/VacancyRegistCard";
import { Vacancy } from "@/app/components/JobInfoCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";

const VacanciesReview = (props: any) => {
  const { searchParams } = props;

  const {
    data: { companyVacanciesDto: vacancies, page, total },
  } = useGetVacanciesReview(1);

  const renderedVacancies = () => {
    if (!vacancies)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (vacancies.length > 0) {
      return vacancies.map((vacancy: Vacancy) => (
        <VacancyRegistCard key={vacancy.vacanciesId} vacancy={vacancy} />
      ));
    } else {
      return <div>目前無職缺申請</div>;
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-3">{renderedVacancies()}</div>
      {vacancies ? (
        vacancies.length > 0 ? (
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

export default VacanciesReview;
