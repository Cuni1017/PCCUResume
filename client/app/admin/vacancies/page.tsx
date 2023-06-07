"use client";

import React, { useState, useEffect } from "react";
import { useGetVacanciesReview } from "@/hooks/teacher/useAdmin";
import Skeleton from "@mui/material/Skeleton";
import VacancyRegistCard from "../components/VacancyRegistCard";
import { Vacancy } from "@/app/components/JobInfoCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";
import { useRouter } from "next/navigation";
import NotFoundCard from "@/app/components/NotFoundCard";

const VacanciesReviewed = (props: any) => {
  const router = useRouter();
  const {
    searchParams: { page, q },
  } = props;
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    isInit ? setIsInit(false) : router.refresh();
  }, [isInit, page, q, router]);

  const {
    data: { companyVacanciesDto: vacancies, total },
  } = useGetVacanciesReview({
    page: page ? page : 1,
    searchTerm: q,
    isReviewed: true,
  });

  const renderedVacancies = () => {
    if (!vacancies)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (vacancies.length > 0) {
      return vacancies.map((vacancy: Vacancy) => (
        <VacancyRegistCard
          key={vacancy.vacanciesId}
          vacancy={vacancy}
          isReviewed
        />
      ));
    } else {
      if (q) return <NotFoundCard />;
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
              page={page ? parseInt(page) : 1}
            />
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default VacanciesReviewed;
