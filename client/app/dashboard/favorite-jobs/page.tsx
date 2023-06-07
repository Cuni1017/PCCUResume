"use client";

import React from "react";
import JobInfoCard, { Vacancy } from "@/app/components/JobInfoCard";
import { useGetFavoriteJobs } from "@/hooks/useFavoriteJobs";
import { useSelector } from "react-redux";
import { Store } from "@/redux/store";

const FavoriteJobs = () => {
  const { id, name, username, role } = useSelector(
    (store: Store) => store.user
  );
  const { data: favoriteJobs } = useGetFavoriteJobs({
    id,
    name,
    username,
    role,
  });

  const renderedJobs = () => {
    if (favoriteJobs.length > 0) {
      return favoriteJobs.map((vacancyAndCompany: any) => (
        <JobInfoCard
          key={vacancyAndCompany.vacancies.vacanciesId}
          vacancy={{ ...vacancyAndCompany, ...vacancyAndCompany.vacancies }}
        />
      ));
    }
    return <div>您目前無儲存的職缺</div>;
  };

  return (
    <div>
      <p className="text-sm">儲存職缺列表</p>
      <div className="flex flex-col gap-3">{renderedJobs()}</div>
    </div>
  );
};

export default FavoriteJobs;
