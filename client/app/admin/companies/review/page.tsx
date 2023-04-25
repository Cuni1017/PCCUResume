"use client";

import React from "react";
import { useGetCompaniesReview } from "@/hooks/useAdmin";
import Skeleton from "@mui/material/Skeleton";
import CompanyRegistCard, { Company } from "../../components/CompanyRegistCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";

const CompaniesReview = (props: any) => {
  const { searchParams } = props;

  const {
    data: { companyDto: companies, total },
  } = useGetCompaniesReview(1);

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
      return <div>目前無公司註冊申請</div>;
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-3">{renderedCompanyRegists()}</div>

      {companies ? (
        companies.length > 0 ? (
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

export default CompaniesReview;
