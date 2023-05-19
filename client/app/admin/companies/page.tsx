"use client";

import React, { useState, useEffect } from "react";
import { useGetCompaniesReview } from "@/hooks/useAdmin";
import Skeleton from "@mui/material/Skeleton";
import CompanyRegistCard, { Company } from "../components/CompanyRegistCard";
import PaginationBar from "@/app/components/SearchContainer/PaginationBar";
import { useRouter } from "next/navigation";
import NotFoundCard from "@/app/components/NotFoundCard";

const CompaniesReviewed = (props: any) => {
  const router = useRouter();
  const {
    searchParams: { page, q },
  } = props;
  const [isInit, setIsInit] = useState(true);

  const {
    data: { companyDto: companies, total },
  } = useGetCompaniesReview({
    page: page ? page : 1,
    searchTerm: q,
    isReviewed: true,
  });

  useEffect(() => {
    isInit ? setIsInit(false) : router.refresh();
  }, [isInit, page, q, router]);

  const renderedCompanyRegists = () => {
    if (!companies)
      return (
        <div>
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      );

    if (companies.length > 0) {
      return companies.map((company: Company) => (
        <CompanyRegistCard
          key={company.companyId}
          company={company}
          isReviewed
        />
      ));
    } else {
      if (q) return <NotFoundCard />;
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
              page={page ? parseInt(page) : 1}
            />
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default CompaniesReviewed;
