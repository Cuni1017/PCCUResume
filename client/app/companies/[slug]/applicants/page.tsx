"use client";

import { useState } from "react";
import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import ApplyTrackCard from "./components/ApplyTrackCard";
import { useGetApplies, usePutApply } from "@/hooks/companyJob/useApplicants";
import { Vacancy } from "@/app/components/SearchContainer/JobInfoCard";
import ContentAction from "../components/CompanyContent/ContentAction";
import ApplyActionDialog from "./components/ApplyActionDialog";

export interface ApplyUser {
  applyId: string;
  applyType: string;
  companyId: string;
  createTime: string;
  resumeId: string;
  studentEmail: string;
  studentImageUrl: string | null;
  studentRealName: string;
  studentUsername: string;
  userId: string;
  vacanciesId: string;
}

export interface Apply {
  applyUserDto: ApplyUser[];
  vacancies: Vacancy;
}

const ApplicantsPage = (props: any) => {
  const {
    params: { slug: companyName },
  } = props;

  const { data: applies } = useGetApplies(companyName);
  console.log(applies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <CompanyHeader companyName={companyName} />
      <div className="px-3 md:p-0">
        <div className="flex justify-between items-center text-lg">
          <div>職缺應徵列表</div>
          <div className="text-sm flex gap-1 sm:gap-2">
            <ContentAction companyName={companyName} />
          </div>
        </div>
        <div className="mt-5">
          {applies.length > 0 ? (
            applies.map((apply: Apply) => (
              <ApplyTrackCard key={apply.vacancies.vacanciesId} apply={apply} />
            ))
          ) : (
            <div>目前沒有任何職缺有應徵者</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
