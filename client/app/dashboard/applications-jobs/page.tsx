"use client";

import React from "react";
import { useGetApplies } from "@/hooks/studentJob/useStudentJob";
import { Store } from "@/redux/store";
import { useSelector } from "react-redux";
import { Company } from "@/app/companies/[slug]/applicants/page";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";
import Card from "@/app/components/Card";

const ApplicationsJobs = () => {
  const user = useSelector((store: Store) => store.user);

  const { data: applies, isFetching } = useGetApplies(user.id);
  console.log(applies);

  const renderedApplyCards = applies.map((apply: Apply) => (
    <ApplyCard key={apply.apply[0].applyId} apply={apply} />
  ));

  return (
    <div>
      <p className="text-sm">應徵列表</p>
      <div className="flex flex-col gap-3">{renderedApplyCards}</div>
    </div>
  );
};

interface Apply {
  apply: {
    applyId: string;
    vacanciesId: string;
    userId: string;
    resumeId: string;
    companyId: string;
    createTime: string;
    applyBeforeTalk: string;
    applyNumber: number;
    applyType: string;
    applyEmail: string;
    applyStartTime: null;
    applyEndTime: null;
  }[];
  fullVacanciesDto: Company & {
    vacancies: Vacancy;
    skills: string;
    county: string;
  };
}

const ApplyCard = ({ apply }: { apply: Apply }) => {
  return <Card classnames="p-3">{apply.apply[0].applyType}</Card>;
};

export default ApplicationsJobs;
