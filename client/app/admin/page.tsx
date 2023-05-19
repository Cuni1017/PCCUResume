"use client";

import { useGetPlatformNews } from "@/hooks/useAdmin";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import StudentRegistCard, { Student } from "./components/StudentRegistCard";
import CompanyRegistCard, { Company } from "./components/CompanyRegistCard";
import { Apply, ApplyUser } from "../companies/[slug]/applicants/page";
import ApplyCard from "./components/ApplyCard";
import { Vacancy } from "../components/JobInfoCard";
import VacancyRegistCard from "./components/VacancyRegistCard";
import AdminNavbar from "./components/AdminNavbar";

const AdminPage = () => {
  const {
    data,
    data: { students, companies, allApplyDtoList, companyVacanciesDto },
  } = useGetPlatformNews();
  console.log(data);

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
      return (
        <div className="text-center text-slate-500">近五日無學生註冊申請</div>
      );
    }
  };

  const renderedCompanyRegists = () => {
    if (!companies)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (companies.length > 0) {
      return companies.map((company: Company) => (
        <CompanyRegistCard key={company.companyId} company={company} />
      ));
    } else {
      return (
        <div className="text-center text-slate-500">近五日無公司註冊申請</div>
      );
    }
  };

  const renderedVacancies = () => {
    if (!companyVacanciesDto)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (companyVacanciesDto.length > 0) {
      return companyVacanciesDto.map((vacancy: Vacancy) => (
        <VacancyRegistCard key={vacancy.vacanciesId} vacancy={vacancy} />
      ));
    } else {
      return (
        <div className="text-center text-slate-500">近五日無刊登職缺申請</div>
      );
    }
  };

  const renderedApplies = () => {
    if (!allApplyDtoList)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (allApplyDtoList.length > 0) {
      return allApplyDtoList.map((apply: Apply) => {
        return apply.applyUserDto.map((student: ApplyUser) => (
          <ApplyCard
            key={apply.fullVacanciesDto.vacancies.vacanciesId}
            student={student}
            vacancy={apply.fullVacanciesDto}
          />
        ));
      });
    } else {
      return (
        <div className="text-center text-slate-500">近五日無學生應徵行為</div>
      );
    }
  };

  return (
    <div className="pb-10">
      <div className="text-xl font-bold">近五日內申請：</div>
      <div className="flex flex-col gap-5">
        <div>
          <div className="text-lg font-bold text-center">學生註冊</div>
          <div className="flex flex-col gap-3">{renderedStudentRegists()}</div>
        </div>
        <hr className="w-full m-0" />
        <div>
          <div className="text-lg font-bold text-center">公司註冊</div>
          <div className="flex flex-col gap-3">{renderedCompanyRegists()}</div>
        </div>
        <hr className="w-full m-0" />
        <div>
          <div className="text-lg font-bold text-center">職缺刊登／更新</div>
          <div className="flex flex-col gap-3">{renderedVacancies()}</div>
        </div>
        <hr className="w-full m-0" />
        <div>
          <div className="text-lg font-bold text-center">學生應徵</div>
          <div className="flex flex-col gap-3">{renderedApplies()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
